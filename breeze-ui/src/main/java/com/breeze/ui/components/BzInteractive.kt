package com.breeze.ui.components

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.ThumbUp
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.Job
import com.breeze.ui.theme.BreezeMotion
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens
import com.breeze.ui.theme.bzClickable
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.math.roundToInt
import kotlin.random.Random

/** 弹幕项（`bz-barrage` push/create 返回值）。 */
data class BzBarrageItem(
    val id: String,
    val text: String,
    val status: String = "like",
    val gift: Int = 0,
    val topPercent: Float,
    val durationSec: Float,
    val createTime: Long,
    val color: Color,
)

/** 弹幕控制器（对应小程序 `selectComponent` + `push`）。 */
class BzBarrageController internal constructor() {
    private var idx = 0
    val items = mutableStateListOf<BzBarrageItem>()

    fun create(text: String, status: String = "like", gift: Int = 0): BzBarrageItem {
        idx += 1
        return BzBarrageItem(
            id = "a$idx",
            text = text,
            status = status,
            gift = gift,
            topPercent = uniqueTopPercent(),
            durationSec = Random.nextFloat() * 4f + 6f,
            createTime = System.currentTimeMillis(),
            color = randomBarrageColor(),
        )
    }

    fun push(text: String, status: String = "like", gift: Int = 0): BzBarrageItem {
        val item = create(text, status, gift)
        items.add(item)
        return item
    }

    private fun uniqueTopPercent(): Float {
        val recent = items.takeLast(10).map { it.topPercent }
        var top: Float
        var tries = 0
        do {
            top = (8 + Random.nextInt(76)).toFloat()
            tries++
            if (tries > 100) break
        } while (recent.any { kotlin.math.abs(it - top) <= 6f })
        return top
    }

    private fun randomBarrageColor(): Color {
        val palette = listOf(
            Color(0xE65B6CFF),
            Color(0xE67C3AED),
            Color(0xE61CBBB4),
            Color(0xE6F37B1D),
            Color(0xE6E54D42),
            Color(0xE610B981),
            Color(0xE63B82F6),
        )
        return palette.random()
    }

    internal fun pruneExpired() {
        val now = System.currentTimeMillis()
        val next = items.filter { now - it.createTime < 12_000 }
        if (next.size != items.size) {
            items.clear()
            items.addAll(next)
        }
    }
}

@Composable
fun rememberBzBarrageController(): BzBarrageController {
    val controller = remember { BzBarrageController() }
    LaunchedEffect(controller) {
        while (true) {
            delay(12_000)
            controller.pruneExpired()
        }
    }
    return controller
}

/**
 * 弹幕层（`bz-barrage`）。通过 [controller] 调用 [BzBarrageController.push]；[content] 为上下 slot 占位。
 */
@Composable
fun BzBarrage(
    controller: BzBarrageController = rememberBzBarrageController(),
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit = {},
) {
    Box(modifier.fillMaxSize()) {
        content()
        Box(Modifier.fillMaxSize()) {
            controller.items.forEach { item ->
                if (item.status == "like") {
                    BarrageLane(item)
                }
            }
        }
        content()
    }
}

@Composable
private fun BarrageLane(item: BzBarrageItem) {
    val progress = remember(item.id) { Animatable(0f) }
    val motionEnabled = BreezeMotion.isEnabled()
    val durationMs = if (motionEnabled) (item.durationSec * 1000).roundToInt() else 0
    LaunchedEffect(item.id) {
        progress.snapTo(0f)
        progress.animateTo(1f, tween(durationMs, easing = LinearEasing))
    }
    BoxWithConstraints(Modifier.fillMaxSize()) {
        val x = maxWidth * (1f - progress.value)
        val y = maxHeight * (item.topPercent / 100f)
        Row(
            Modifier
                .offset(x = x, y = y)
                .clip(RoundedCornerShape(20.dp))
                .background(item.color)
                .padding(horizontal = 10.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            BzIcon(Icons.Default.ThumbUp, tint = BreezeTokens.White, modifier = Modifier.size(16.dp))
            Text(
                item.text,
                color = BreezeTokens.White,
                fontSize = 13.sp,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier.padding(start = 6.dp),
            )
        }
    }
}

/** 表情项（`bz-emoji` chooseEmoji detail.src；Compose 侧默认 Unicode，[src] 可承载 URL）。 */
data class BzEmojiItem(val id: Int, val emoji: String, val src: String = emoji)

private val defaultEmojiItems: List<BzEmojiItem> = buildList {
    val chars = listOf(
        "😀", "😁", "😂", "🤣", "😊", "😍", "😘", "😎", "🤔", "😢",
        "😭", "😡", "👍", "👎", "🙏", "👏", "🎉", "❤️", "🔥", "✨",
        "🥳", "😴", "🤗", "😇", "🤩", "😋", "🥰", "😤", "🙄", "😱",
    )
    chars.forEachIndexed { index, ch ->
        add(BzEmojiItem(id = index + 7, emoji = ch, src = ch))
    }
}

/**
 * 表情选择（`bz-emoji`）。事件对齐 `chooseEmoji` → [onChooseEmoji]。
 */
@Composable
fun BzEmoji(
    modifier: Modifier = Modifier,
    emojiList: List<BzEmojiItem> = defaultEmojiItems,
    columns: Int = 8,
    onChooseEmoji: (BzEmojiItem) -> Unit = {},
) {
    LazyVerticalGrid(
        columns = GridCells.Fixed(columns),
        modifier = modifier
            .clip(RoundedCornerShape(BreezeTheme.radius.md))
            .background(BreezeTheme.colors.surface)
            .padding(8.dp),
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        items(emojiList, key = { it.id }) { item ->
            Text(
                text = item.emoji,
                fontSize = 24.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier
                    .bzClickable { onChooseEmoji(item) }
                    .padding(6.dp),
            )
        }
    }
}

private data class LikeBurst(
    val idx: Int,
    val x: Float,
    val y: Float,
    val tint: Color,
    val scale: Float,
)

/**
 * 全屏点赞特效（`bz-full-like`）。点击区域产生爱心气泡；[onLikeClickDelay] 对齐 3s 汇总。
 */
@Composable
fun BzFullLike(
    modifier: Modifier = Modifier,
    onLikeClick: () -> Unit = {},
    onLikeClickDelay: (count: Int) -> Unit = {},
    content: @Composable () -> Unit = {},
) {
    val bursts = remember { mutableStateListOf<LikeBurst>() }
    var idx by remember { mutableIntStateOf(0) }
    var burstCount by remember { mutableIntStateOf(0) }
    var aggregateJob by remember { mutableStateOf<Job?>(null) }
    var lastClickAt by remember { mutableStateOf(0L) }
    val scope = rememberCoroutineScope()
    val clickGapMs = 120L
    val palette = listOf(
        BreezeTheme.colors.primary,
        BreezeTheme.colors.secondary,
        BreezeTokens.Pink,
        BreezeTokens.Orange,
        BreezeTokens.Cyan,
    )

    Box(
        modifier
            .fillMaxSize()
            .pointerInput(Unit) {
                detectTapGestures { offset ->
                    val now = System.currentTimeMillis()
                    if (lastClickAt != 0L && now - lastClickAt < clickGapMs) return@detectTapGestures
                    lastClickAt = now
                    idx += 1
                    val burstIdx = idx
                    bursts.add(
                        LikeBurst(
                            idx = burstIdx,
                            x = offset.x,
                            y = offset.y,
                            tint = palette.random(),
                            scale = Random.nextFloat() * 0.4f + 0.8f,
                        ),
                    )
                    onLikeClick()
                    burstCount += 1
                    aggregateJob?.cancel()
                    aggregateJob = scope.launch {
                        delay(3000)
                        onLikeClickDelay(burstCount)
                        burstCount = 0
                    }
                    scope.launch {
                        delay(6000)
                        bursts.removeAll { it.idx == burstIdx }
                    }
                }
            },
    ) {
        content()
        bursts.forEach { burst ->
            LikeBubble(burst)
        }
    }
}

@Composable
private fun LikeBubble(burst: LikeBurst) {
    val offsetY = remember(burst.idx) { Animatable(0f) }
    val alpha = remember(burst.idx) { Animatable(1f) }
    val motionEnabled = BreezeMotion.isEnabled()
    val ms = BreezeMotion.durationMs(BreezeMotion.DurationSlow)
    LaunchedEffect(burst.idx) {
        if (motionEnabled) {
            kotlinx.coroutines.coroutineScope {
                launch {
                    offsetY.animateTo(-120f, tween(ms, easing = BreezeMotion.EasingDecelerate))
                }
                launch {
                    delay(ms / 2L)
                    alpha.animateTo(0f, tween(ms / 2, easing = LinearEasing))
                }
            }
        }
    }
    BzIcon(
        Icons.Default.Favorite,
        tint = burst.tint,
        modifier = Modifier
            .offset { IntOffset((burst.x - 24).roundToInt(), (burst.y - 80 + offsetY.value).roundToInt()) }
            .size((32 * burst.scale).dp)
            .alpha(alpha.value),
    )
}
