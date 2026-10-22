package com.breeze.ui.components

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.animation.core.tween
import com.breeze.ui.theme.BreezeMotion
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens

/** 表单容器（`bz-form`）。 */
@Composable
fun BzForm(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    Column(
        modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(BreezeTheme.radius.lg))
            .background(BreezeTokens.White)
            .padding(vertical = 4.dp),
    ) {
        content()
    }
}

/**
 * 表单字段（`bz-form-field`）。
 */
@Composable
fun BzFormField(
    label: String,
    modifier: Modifier = Modifier,
    required: Boolean = false,
    errorMessage: String? = null,
    alignStart: Boolean = false,
    controlAlignEnd: Boolean = false,
    content: @Composable () -> Unit,
) {
    Column(modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 10.dp)) {
        Row(
            Modifier.fillMaxWidth(),
            verticalAlignment = if (alignStart) Alignment.Top else Alignment.CenterVertically,
        ) {
            Row(Modifier.weight(1f)) {
                Text(label, fontWeight = FontWeight.Medium, fontSize = 14.sp)
                if (required) {
                    Text("*", color = BreezeTokens.Red, modifier = Modifier.padding(start = 2.dp))
                }
            }
            Row(
                Modifier.weight(1.2f),
                horizontalArrangement = if (controlAlignEnd) Arrangement.End else Arrangement.Start,
            ) {
                content()
            }
        }
        errorMessage?.let {
            Text(it, color = BreezeTokens.Red, fontSize = 12.sp, modifier = Modifier.padding(top = 4.dp))
        }
    }
}

data class BzCheckboxOption(val value: String, val label: String)

/** 复选组（`bz-checkbox-group`）。 */
@Composable
fun BzCheckboxGroup(
    options: List<BzCheckboxOption>,
    checked: Set<String>,
    onCheckedChange: (Set<String>) -> Unit,
    modifier: Modifier = Modifier,
    blockLayout: Boolean = false,
) {
    if (blockLayout) {
        Column(modifier) {
            options.forEach { opt ->
                BzFormField(label = opt.label, controlAlignEnd = true) {
                    BzCheckbox(
                        checked = checked.contains(opt.value),
                        onCheckedChange = { on ->
                            onCheckedChange(
                                if (on) checked + opt.value else checked - opt.value,
                            )
                        },
                    )
                }
            }
        }
    } else {
        Column(modifier, verticalArrangement = Arrangement.spacedBy(8.dp)) {
            options.forEach { opt ->
                BzCheckbox(
                    checked = checked.contains(opt.value),
                    onCheckedChange = { on ->
                        onCheckedChange(
                            if (on) checked + opt.value else checked - opt.value,
                        )
                    },
                    label = opt.label,
                )
            }
        }
    }
}

/** 选择组容器（`bz-choose`）— 胶囊多选/单选外观。 */
@Composable
fun BzChoose(
    options: List<String>,
    selected: Set<String>,
    onSelected: (Set<String>) -> Unit,
    modifier: Modifier = Modifier,
    multi: Boolean = true,
) {
    Row(modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        options.forEach { opt ->
            val active = selected.contains(opt)
            BzTag(
                text = opt,
                light = !active,
                onClick = {
                    onSelected(
                        when {
                            multi && active -> selected - opt
                            multi -> selected + opt
                            active -> selected
                            else -> setOf(opt)
                        },
                    )
                },
            )
        }
    }
}

enum class BzStateBoxView { Content, Loading, Skeleton, Error, Empty }

/** 状态盒（`bz-state-box`）。 */
@Composable
fun BzStateBox(
    state: BzStateBoxView,
    modifier: Modifier = Modifier,
    loadingText: String? = null,
    errorMessage: String = "加载失败",
    emptyText: String = "暂无数据",
    onRetry: (() -> Unit)? = null,
    content: @Composable () -> Unit,
) {
    val ms = BreezeMotion.durationMs(BreezeMotion.DurationNormal)
    AnimatedContent(
        targetState = state,
        transitionSpec = { fadeIn(tween(ms)) togetherWith fadeOut(tween(ms)) },
        label = "stateBox",
    ) { view ->
        when (view) {
            BzStateBoxView.Loading -> BzLoading(text = loadingText)
            BzStateBoxView.Skeleton -> Column(Modifier.padding(16.dp)) {
                repeat(3) { BzSkeleton(height = 14.dp, modifier = Modifier.padding(bottom = 8.dp)) }
            }
            BzStateBoxView.Error -> BzEmpty(title = errorMessage) {
                onRetry?.let { BzButton(text = "重试", onClick = it) }
            }
            BzStateBoxView.Empty -> BzEmpty(title = emptyText)
            BzStateBoxView.Content -> content()
        }
    }
}
