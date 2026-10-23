package com.breeze.ui.components

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.tween
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
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
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import com.breeze.ui.theme.BreezeMotion
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens
import com.breeze.ui.theme.bzClickable
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.math.roundToInt
import kotlin.random.Random

/**
 * 贝塞尔路径点赞 / 爱心上浮特效（`bz-bessel`）。
 *
 * 事件对应小程序：`likeClick`、[onLikeClickDelay]（2s 防抖汇总点击次数）。
 */
@Composable
fun BzBessel(
    modifier: Modifier = Modifier,
    onLikeClick: () -> Unit = {},
    onLikeClickDelay: (count: Int) -> Unit = {},
    icon: ImageVector = Icons.Filled.Favorite,
) {
    val motion = BreezeMotion.isEnabled()
    val scope = rememberCoroutineScope()
    val bubbles = remember { mutableStateListOf<BesselBubble>() }
    var nextId by remember { mutableIntStateOf(0) }
    var tapScaleTarget by remember { mutableStateOf(1f) }
    val tapScale by animateFloatAsState(
        targetValue = tapScaleTarget,
        animationSpec = BreezeMotion.springPress(),
        label = "besselTap",
    )
    var pendingLikes by remember { mutableIntStateOf(0) }
    var delayJob by remember { mutableStateOf<Job?>(null) }

    val primary = BreezeTheme.colors.primary
    val secondary = BreezeTheme.colors.secondary
    val heartTints = remember(primary, secondary) {
        listOf(
            BreezeTokens.Red,
            primary,
            secondary,
            Color(0xFFFF6B9D),
            Color(0xFFFFB347),
            Color(0xFF22D3EE),
        )
    }

    fun scheduleDelayBurst() {
        delayJob?.cancel()
        delayJob = scope.launch {
            delay(2000)
            val count = pendingLikes
            pendingLikes = 0
            if (count > 0) onLikeClickDelay(count)
        }
    }

    fun emitLike() {
        onLikeClick()
        pendingLikes += 1
        scheduleDelayBurst()
        val variant = Random.nextInt(1, 12)
        val scaleKind = Random.nextInt(1, 4)
        val tint = heartTints.random()
        bubbles.add(
            BesselBubble(
                id = nextId++,
                variant = variant,
                scaleKind = scaleKind,
                tint = tint,
            ),
        )
        if (motion) {
            scope.launch {
                tapScaleTarget = 1.32f
                delay(500)
                tapScaleTarget = 1f
            }
        }
    }

    Box(modifier.height(220.dp), contentAlignment = Alignment.BottomCenter) {
        Box(
            Modifier
                .height(200.dp)
                .align(Alignment.BottomCenter),
            contentAlignment = Alignment.BottomCenter,
        ) {
            bubbles.forEach { bubble ->
                BesselBubbleLayer(
                    bubble = bubble,
                    motion = motion,
                    onFinished = { bubbles.remove(bubble) },
                )
            }
        }
        BzIcon(
            imageVector = icon,
            tint = BreezeTokens.Red,
            modifier = Modifier
                .size(36.dp)
                .scale(tapScale)
                .bzClickable(onClick = { emitLike() }),
        )
    }
}

private data class BesselBubble(
    val id: Int,
    val variant: Int,
    val scaleKind: Int,
    val tint: Color,
)

@Composable
private fun BesselBubbleLayer(
    bubble: BesselBubble,
    motion: Boolean,
    onFinished: () -> Unit,
) {
    val progress = remember(bubble.id) { Animatable(0f) }
    val durationMs = if (motion) 3000 else 0

    LaunchedEffect(bubble.id, motion) {
        progress.snapTo(0f)
        progress.animateTo(
            targetValue = 1f,
            animationSpec = tween(durationMs, easing = LinearEasing),
        )
        onFinished()
    }

    val t = progress.value
    val xPx = horizontalOffsetPx(bubble.variant, t)
    val yPx = verticalOffsetPx(t)
    val scale = scaleForBubble(bubble.scaleKind, t, motion)
    val alpha = alphaForBubble(t)

    BzIcon(
        imageVector = Icons.Filled.Favorite,
        tint = bubble.tint,
        modifier = Modifier
            .offset { IntOffset(xPx.roundToInt(), (-yPx).roundToInt()) }
            .scale(scale)
            .alpha(alpha)
            .size(40.dp),
    )
}

/** 水平摆动关键帧（源自小程序 `bubble_*` CSS）。 */
private fun horizontalOffsetPx(variant: Int, t: Float): Float {
    val keyframes = BESSEL_HORIZONTAL[variant] ?: BESSEL_HORIZONTAL[1]!!
    return piecewiseLinearPx(keyframes, t) * densityScale
}

private fun verticalOffsetPx(t: Float): Float {
    val y = when {
        t <= 0.1f -> 0f
        t >= 1f -> 200f
        else -> {
            val local = (t - 0.1f) / 0.9f
            local * 200f
        }
    }
    return y * densityScale
}

private fun scaleForBubble(kind: Int, t: Float, motion: Boolean): Float {
    if (!motion) return 1f
    val growEnd = 0.8f / 3f
    val target = when (kind) {
        1 -> 1.2f
        2 -> 0.9f
        else -> 0.6f
    }
    val growT = (t / growEnd).coerceIn(0f, 1f)
    return 0.3f + (target - 0.3f) * growT
}

private fun alphaForBubble(t: Float): Float = when {
    t < 0.75f -> 1f
    t >= 1f -> 0f
    else -> 1f - (t - 0.75f) / 0.25f
}

private data class KeyPx(val at: Float, val px: Float)

private fun piecewiseLinearPx(keys: List<KeyPx>, t: Float): Float {
    if (keys.isEmpty()) return 0f
    if (t <= keys.first().at) return keys.first().px
    for (i in 0 until keys.size - 1) {
        val a = keys[i]
        val b = keys[i + 1]
        if (t <= b.at) {
            val span = (b.at - a.at).coerceAtLeast(0.0001f)
            val local = (t - a.at) / span
            return a.px + (b.px - a.px) * local
        }
    }
    return keys.last().px
}

/** CSS `margin-left` 像素值 → Compose 偏移（约 1.1x 以适配 dp）。 */
private const val densityScale = 1.1f

private val BESSEL_HORIZONTAL: Map<Int, List<KeyPx>> = mapOf(
    1 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, -8f), KeyPx(0.5f, 8f), KeyPx(0.75f, -15f), KeyPx(1f, 15f)),
    2 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, 20f), KeyPx(0.5f, 25f), KeyPx(0.75f, 10f), KeyPx(1f, 5f)),
    3 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, -20f), KeyPx(0.5f, 10f), KeyPx(0.75f, 20f), KeyPx(1f, -10f)),
    4 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, -5f), KeyPx(0.5f, -5f), KeyPx(0.75f, 20f), KeyPx(1f, 10f)),
    5 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, 5f), KeyPx(0.5f, -5f), KeyPx(0.75f, -10f), KeyPx(1f, -20f)),
    6 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, -3f), KeyPx(0.5f, -1f), KeyPx(0.75f, -2f), KeyPx(1f, -3f)),
    7 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, 3f), KeyPx(0.5f, 1f), KeyPx(0.75f, 2f), KeyPx(1f, 3f)),
    8 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, 20f), KeyPx(0.5f, 20f), KeyPx(0.75f, 20f), KeyPx(1f, 20f)),
    9 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, 10f), KeyPx(0.5f, 10f), KeyPx(0.75f, 10f), KeyPx(1f, 10f)),
    10 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, -20f), KeyPx(0.5f, -20f), KeyPx(0.75f, -20f), KeyPx(1f, -20f)),
    11 to listOf(KeyPx(0f, 0f), KeyPx(0.25f, -10f), KeyPx(0.5f, -10f), KeyPx(0.75f, -10f), KeyPx(1f, -18f)),
)
