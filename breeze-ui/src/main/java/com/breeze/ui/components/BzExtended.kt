@file:OptIn(androidx.compose.foundation.ExperimentalFoundationApi::class)

package com.breeze.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.core.tween
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.staggeredgrid.LazyVerticalStaggeredGrid
import androidx.compose.foundation.lazy.staggeredgrid.StaggeredGridCells
import androidx.compose.foundation.lazy.staggeredgrid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ChevronLeft
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.RangeSlider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.material3.pulltorefresh.rememberPullToRefreshState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Popup
import com.breeze.ui.theme.BreezeMotion
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens
import com.breeze.ui.theme.bzClickable
import java.time.LocalDate
import java.time.YearMonth
import kotlin.math.roundToInt

/** 下拉刷新（`bz-pull-refresh`）。 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BzPullRefresh(
    refreshing: Boolean,
    onRefresh: () -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    val state = rememberPullToRefreshState()
    PullToRefreshBox(
        isRefreshing = refreshing,
        onRefresh = onRefresh,
        state = state,
        modifier = modifier,
        content = { content() },
    )
}

/** 吸顶容器：在 [LazyColumn] 的 `stickyHeader { }` 内使用（`bz-sticky`）。 */
@Composable
fun BzSticky(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    Box(
        modifier
            .fillMaxWidth()
            .background(BreezeTokens.White)
            .padding(vertical = 8.dp, horizontal = 16.dp),
    ) {
        content()
    }
}

fun LazyListScope.BzStickyHeader(
    key: Any? = null,
    content: @Composable () -> Unit,
) {
    item(key = key) { BzSticky { content() } }
}

/** 瀑布流（`bz-waterfall-flow`）。 */
@Composable
fun BzWaterfallFlow(
    columns: Int,
    modifier: Modifier = Modifier,
    items: List<BzWaterfallItem>,
) {
    LazyVerticalStaggeredGrid(
        columns = StaggeredGridCells.Fixed(columns),
        modifier = modifier,
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalItemSpacing = 8.dp,
    ) {
        items(items, key = { it.id }) { item ->
            Box(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(BreezeTheme.radius.md))
                    .background(item.color)
                    .height(item.heightDp.dp)
                    .padding(8.dp),
            ) {
                Text(item.label, color = BreezeTokens.White, fontWeight = FontWeight.Medium)
            }
        }
    }
}

data class BzWaterfallItem(val id: String, val label: String, val heightDp: Int, val color: Color)

/** 月历（`bz-calendar`）简化版。 */
@Composable
fun BzCalendar(
    selected: LocalDate,
    onSelect: (LocalDate) -> Unit,
    modifier: Modifier = Modifier,
    month: YearMonth = YearMonth.from(selected),
) {
    var currentMonth by remember(month) { mutableStateOf(month) }
    Column(modifier.fillMaxWidth().clip(RoundedCornerShape(BreezeTheme.radius.lg)).background(BreezeTokens.White).padding(12.dp)) {
        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Box(Modifier.bzClickable { currentMonth = currentMonth.minusMonths(1) }) {
                BzIcon(Icons.Default.ChevronLeft, tint = BreezeTheme.colors.primary)
            }
            Text(
                "${currentMonth.year}年${currentMonth.monthValue}月",
                modifier = Modifier.weight(1f),
                textAlign = TextAlign.Center,
                fontWeight = FontWeight.SemiBold,
            )
            Box(Modifier.bzClickable { currentMonth = currentMonth.plusMonths(1) }) {
                BzIcon(Icons.Default.ChevronRight, tint = BreezeTheme.colors.primary)
            }
        }
        Row(Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
            listOf("日", "一", "二", "三", "四", "五", "六").forEach {
                Text(it, Modifier.weight(1f), textAlign = TextAlign.Center, fontSize = 12.sp, color = BreezeTokens.Grey)
            }
        }
        val first = currentMonth.atDay(1)
        val offset = first.dayOfWeek.value % 7
        val days = currentMonth.lengthOfMonth()
        val cells = (0 until offset).map { null } + (1..days).map { currentMonth.atDay(it) }
        cells.chunked(7).forEach { week ->
            Row(Modifier.fillMaxWidth()) {
                week.forEach { day ->
                    Box(
                        Modifier
                            .weight(1f)
                            .aspectRatio(1f)
                            .padding(2.dp)
                            .clip(CircleShape)
                            .then(
                                if (day != null && day == selected) Modifier.background(BreezeTheme.colors.primary)
                                else Modifier,
                            )
                            .then(if (day != null) Modifier.bzClickable { onSelect(day) } else Modifier),
                        contentAlignment = Alignment.Center,
                    ) {
                        day?.let {
                            Text(
                                "${it.dayOfMonth}",
                                color = if (it == selected) BreezeTokens.White else BreezeTokens.Black,
                                fontSize = 13.sp,
                            )
                        }
                    }
                }
                repeat(7 - week.size) { Box(Modifier.weight(1f)) }
            }
        }
    }
}

/** 选择器（`bz-picker`）— 底部列表弹层。 */
@Composable
fun BzPicker(
    visible: Boolean,
    title: String,
    options: List<String>,
    selectedIndex: Int,
    onSelect: (Int) -> Unit,
    onDismiss: () -> Unit,
) {
    if (!visible) return
    val motionMs = BreezeMotion.durationMs(BreezeMotion.DurationNormal)
    androidx.compose.ui.window.Dialog(onDismissRequest = onDismiss) {
        AnimatedVisibility(
            visible = true,
            enter = fadeIn(tween(motionMs)) + slideInVertically(tween(motionMs)) { it / 2 },
            exit = fadeOut(tween(BreezeMotion.durationMs(BreezeMotion.DurationFast))),
        ) {
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp))
                    .background(BreezeTokens.White)
                    .padding(bottom = 24.dp),
            ) {
                Text(title, Modifier.fillMaxWidth().padding(16.dp), textAlign = TextAlign.Center, fontWeight = FontWeight.SemiBold)
                options.forEachIndexed { index, label ->
                    Box(
                        Modifier
                            .fillMaxWidth()
                            .bzClickable {
                                onSelect(index)
                                onDismiss()
                            }
                            .padding(vertical = 14.dp),
                        contentAlignment = Alignment.Center,
                    ) {
                        Text(
                            label,
                            color = if (index == selectedIndex) BreezeTheme.colors.primary else BreezeTokens.Black,
                            fontWeight = if (index == selectedIndex) FontWeight.SemiBold else FontWeight.Normal,
                        )
                    }
                    HorizontalDivider(color = BreezeTheme.colors.divider)
                }
            }
        }
    }
}

/** 双滑块（`bz-double-slider`）。 */
@Composable
fun BzDoubleSlider(
    range: ClosedFloatingPointRange<Float>,
    onRangeChange: (ClosedFloatingPointRange<Float>) -> Unit,
    modifier: Modifier = Modifier,
    valueRange: ClosedFloatingPointRange<Float> = 0f..100f,
) {
    RangeSlider(
        value = range,
        onValueChange = onRangeChange,
        valueRange = valueRange,
        modifier = modifier,
        colors = SliderDefaults.colors(
            thumbColor = BreezeTheme.colors.primary,
            activeTrackColor = BreezeTheme.colors.primary,
            inactiveTrackColor = BreezeTheme.colors.light,
        ),
    )
}

/** 颜色选择（`bz-color-picker`）预设 + 滑块色相。 */
@Composable
fun BzColorPicker(
    selected: Color,
    onSelected: (Color) -> Unit,
    modifier: Modifier = Modifier,
) {
    val presets = listOf(
        BreezeTheme.colors.primary,
        BreezeTokens.Red,
        BreezeTokens.Orange,
        BreezeTokens.Green,
        BreezeTokens.Cyan,
        BreezeTokens.Purple,
    )
    Column(modifier) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            presets.forEach { c ->
                Box(
                    Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(c)
                        .border(
                            width = if (c == selected) 2.dp else 0.dp,
                            color = BreezeTokens.Black,
                            shape = CircleShape,
                        )
                        .bzClickable { onSelected(c) },
                )
            }
        }
    }
}

/** 图片上传格（`bz-upload`）— UI 槽位，由宿主处理实际选取。 */
@Composable
fun BzUpload(
    imageCount: Int,
    maxCount: Int,
    onAddClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Row(modifier, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        repeat(imageCount) {
            Box(
                Modifier
                    .size(72.dp)
                    .clip(RoundedCornerShape(BreezeTheme.radius.md))
                    .background(BreezeTheme.colors.light),
            )
        }
        if (imageCount < maxCount) {
            Box(
                Modifier
                    .size(72.dp)
                    .clip(RoundedCornerShape(BreezeTheme.radius.md))
                    .border(1.dp, BreezeTheme.colors.divider, RoundedCornerShape(BreezeTheme.radius.md))
                    .bzClickable(onClick = onAddClick),
                contentAlignment = Alignment.Center,
            ) {
                BzIcon(Icons.Default.Add, tint = BreezeTheme.colors.primary)
            }
        }
    }
}

data class BzTimelineEntry(val title: String, val time: String, val content: String? = null)

/** 时间轴（`bz-timeline`）。 */
@Composable
fun BzTimeline(entries: List<BzTimelineEntry>, modifier: Modifier = Modifier) {
    Column(modifier.padding(16.dp)) {
        entries.forEachIndexed { index, entry ->
            Row {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(
                        Modifier
                            .size(10.dp)
                            .clip(CircleShape)
                            .background(BreezeTheme.colors.primary),
                    )
                    if (index < entries.lastIndex) {
                        Box(
                            Modifier
                                .width(2.dp)
                                .height(48.dp)
                                .background(BreezeTheme.colors.light),
                        )
                    }
                }
                Column(Modifier.padding(start = 12.dp, bottom = 16.dp)) {
                    Text(entry.title, fontWeight = FontWeight.Medium)
                    Text(entry.time, fontSize = 12.sp, color = BreezeTokens.Grey)
                    entry.content?.let { Text(it, fontSize = 13.sp, color = BreezeTokens.DarkGray) }
                }
            }
        }
    }
}

data class BzTableColumn(val key: String, val title: String, val weight: Float = 1f)

/** 表格（`bz-table` / 轻量管理表）。 */
@Composable
fun BzTable(
    columns: List<BzTableColumn>,
    rows: List<Map<String, String>>,
    modifier: Modifier = Modifier,
) {
    Column(
        modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(BreezeTheme.radius.md))
            .background(BreezeTokens.White)
            .border(1.dp, BreezeTheme.colors.divider, RoundedCornerShape(BreezeTheme.radius.md)),
    ) {
        Row(Modifier.background(BreezeTheme.colors.light).padding(12.dp)) {
            columns.forEach { col ->
                Text(col.title, Modifier.weight(col.weight), fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
            }
        }
        HorizontalDivider()
        rows.forEach { row ->
            Row(Modifier.padding(12.dp)) {
                columns.forEach { col ->
                    Text(row[col.key] ?: "", Modifier.weight(col.weight), fontSize = 13.sp)
                }
            }
            HorizontalDivider(color = BreezeTheme.colors.divider)
        }
    }
}

/** 文字提示（`bz-tooltip`）。 */
@Composable
fun BzTooltip(
    text: String,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    var show by remember { mutableStateOf(false) }
    val density = LocalDensity.current
    var anchorY by remember { mutableIntStateOf(0) }
    Box(
        modifier.onGloballyPositioned { anchorY = it.size.height },
    ) {
        Box(Modifier.bzClickable { show = !show }) { content() }
        if (show) {
            Popup(offset = IntOffset(0, with(density) { anchorY.toDp().roundToPx() })) {
                Text(
                    text,
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(BreezeTokens.Black.copy(alpha = 0.85f))
                        .padding(horizontal = 10.dp, vertical = 6.dp),
                    color = BreezeTokens.White,
                    fontSize = 12.sp,
                )
            }
        }
    }
}

/**
 * 自定义导航（`bz-custom`）。
 */
@Composable
fun BzCustomNav(
    title: String,
    modifier: Modifier = Modifier,
    onBack: (() -> Unit)? = null,
    useGradient: Boolean = true,
    content: @Composable () -> Unit = {},
) {
    Column(modifier) {
        BzTitleBar(title = title, showBack = onBack != null, onBack = onBack, useGradient = useGradient)
        content()
    }
}

/**
 * 自定义导航增强（`bz-custom-pro`）：标题 + 副标题 + 右侧操作区。
 */
@Composable
fun BzCustomNavPro(
    title: String,
    subtitle: String? = null,
    modifier: Modifier = Modifier,
    onBack: (() -> Unit)? = null,
    actions: @Composable (() -> Unit)? = null,
) {
    Column(
        modifier
            .fillMaxWidth()
            .background(BreezeTheme.colors.variant.gradientBrush)
            .padding(top = 48.dp, bottom = 16.dp, start = 16.dp, end = 16.dp),
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            if (onBack != null) {
                Text("←", color = BreezeTokens.White, modifier = Modifier.bzClickable(onClick = onBack).padding(end = 8.dp))
            }
            Column(Modifier.weight(1f)) {
                Text(title, color = BreezeTokens.White, fontWeight = FontWeight.Bold, fontSize = 20.sp)
                subtitle?.let { Text(it, color = BreezeTokens.White.copy(alpha = 0.85f), fontSize = 13.sp) }
            }
            actions?.invoke()
        }
    }
}
