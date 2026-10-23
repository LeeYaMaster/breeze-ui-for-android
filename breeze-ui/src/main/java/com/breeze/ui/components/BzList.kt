package com.breeze.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.breeze.ui.theme.BreezeMotion
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens
import com.breeze.ui.theme.bzClickable

/** 卡片（`bz-card`）。 */
@Composable
fun BzCard(
    modifier: Modifier = Modifier,
    title: String? = null,
    onClick: (() -> Unit)? = null,
    content: @Composable () -> Unit,
) {
    Column(
        modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(BreezeTheme.radius.lg))
            .background(BreezeTokens.White)
            .then(if (onClick != null) Modifier.bzClickable(onClick = onClick) else Modifier)
            .padding(16.dp),
    ) {
        title?.let {
            Text(it, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
        }
        content()
    }
}

/** 列表菜单（`bz-list-menu`）。 */
@Composable
fun BzListMenu(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    Column(
        modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(BreezeTheme.radius.lg))
            .background(BreezeTokens.White),
    ) {
        content()
    }
}

@Composable
fun BzListMenuItem(
    title: String,
    modifier: Modifier = Modifier,
    icon: @Composable (() -> Unit)? = null,
    onClick: (() -> Unit)? = null,
) {
    Row(
        modifier
            .fillMaxWidth()
            .then(if (onClick != null) Modifier.bzClickable(onClick = onClick) else Modifier)
            .padding(horizontal = 16.dp, vertical = 14.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        icon?.invoke()
        Text(title, modifier = Modifier.weight(1f).padding(start = if (icon != null) 12.dp else 0.dp))
        Text("›", color = BreezeTokens.Grey)
    }
    HorizontalDivider(color = BreezeTheme.colors.divider)
}

data class BzStep(val title: String, val description: String? = null)

/** 步骤条（`bz-steps`）。 */
@Composable
fun BzSteps(
    steps: List<BzStep>,
    current: Int,
    modifier: Modifier = Modifier,
) {
    Column(modifier.fillMaxWidth().padding(16.dp)) {
        steps.forEachIndexed { index, step ->
            Row(verticalAlignment = Alignment.Top) {
                Box(
                    Modifier
                        .clip(RoundedCornerShape(50))
                        .background(if (index <= current) BreezeTheme.colors.primary else BreezeTokens.GreyLight)
                        .padding(horizontal = 10.dp, vertical = 4.dp),
                ) {
                    Text(
                        "${index + 1}",
                        color = if (index <= current) BreezeTokens.White else BreezeTokens.Grey,
                        fontSize = 12.sp,
                    )
                }
                Column(Modifier.padding(start = 12.dp, bottom = 16.dp)) {
                    Text(step.title, fontWeight = if (index == current) FontWeight.Bold else FontWeight.Normal)
                    step.description?.let { Text(it, color = BreezeTokens.Grey, fontSize = 12.sp) }
                }
            }
        }
    }
}

/** 标签页（`bz-tabs`），带滑动指示条。 */
@Composable
fun BzTabs(
    tabs: List<String>,
    selectedIndex: Int,
    onSelected: (Int) -> Unit,
    modifier: Modifier = Modifier,
) {
    BoxWithConstraints(modifier.fillMaxWidth().background(BreezeTokens.White)) {
        val tabWidth = maxWidth / tabs.size.coerceAtLeast(1)
        val indicatorOffset by animateDpAsState(
            targetValue = tabWidth * selectedIndex,
            animationSpec = BreezeMotion.springEmphasisDp(),
            label = "tabIndicator",
        )
        Row(Modifier.fillMaxWidth()) {
            tabs.forEachIndexed { index, label ->
                val selected = index == selectedIndex
                Box(
                    Modifier
                        .weight(1f)
                        .bzClickable { onSelected(index) }
                        .padding(vertical = 12.dp),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(
                        label,
                        color = if (selected) BreezeTheme.colors.primary else BreezeTokens.DarkGray,
                        fontWeight = if (selected) FontWeight.SemiBold else FontWeight.Normal,
                    )
                }
            }
        }
        Box(
            Modifier
                .align(Alignment.BottomStart)
                .offset(x = indicatorOffset)
                .width(tabWidth)
                .height(3.dp)
                .clip(RoundedCornerShape(topStart = 2.dp, topEnd = 2.dp))
                .background(BreezeTheme.colors.primary),
        )
    }
}

/** 分段器（`bz-segment`），选中块带位移动画。 */
@Composable
fun BzSegment(
    options: List<String>,
    selectedIndex: Int,
    onSelected: (Int) -> Unit,
    modifier: Modifier = Modifier,
) {
    BoxWithConstraints(
        modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(BreezeTheme.radius.md))
            .background(BreezeTheme.colors.light)
            .padding(4.dp),
    ) {
        val segmentWidth = (maxWidth - 8.dp) / options.size.coerceAtLeast(1)
        val pillOffset by animateDpAsState(
            targetValue = segmentWidth * selectedIndex,
            animationSpec = BreezeMotion.springEmphasisDp(),
            label = "segmentPill",
        )
        Box(
            Modifier
                .offset(x = pillOffset)
                .width(segmentWidth)
                .clip(RoundedCornerShape(BreezeTheme.radius.sm))
                .background(BreezeTokens.White)
                .height(36.dp),
        )
        Row(Modifier.fillMaxWidth()) {
            options.forEachIndexed { index, label ->
                val selected = index == selectedIndex
                val textColor by animateColorAsState(
                    targetValue = if (selected) BreezeTheme.colors.primary else BreezeTokens.DarkGray,
                    animationSpec = tween(
                        BreezeMotion.durationMs(BreezeMotion.DurationFast),
                        easing = BreezeMotion.EasingStandard,
                    ),
                    label = "segColor",
                )
                Box(
                    Modifier
                        .weight(1f)
                        .bzClickable { onSelected(index) }
                        .padding(vertical = 8.dp),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(
                        label,
                        fontSize = 13.sp,
                        color = textColor,
                        fontWeight = if (selected) FontWeight.Medium else FontWeight.Normal,
                    )
                }
            }
        }
    }
}

private fun <T> tween(duration: Int, easing: androidx.compose.animation.core.Easing) =
    androidx.compose.animation.core.tween<T>(duration, easing = easing)
