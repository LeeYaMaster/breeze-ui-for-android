package com.breeze.ui.theme

import android.provider.Settings
import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.animation.core.FastOutLinearInEasing
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext

/**
 * Breeze UI 动效令牌（时长 / 缓动）。
 *
 * 设计目标：比小程序更顺滑，默认 60fps 友好；当系统关闭动画时自动降级。
 */
object BreezeMotion {
    const val DurationInstant = 0
    const val DurationFast = 150
    const val DurationNormal = 250
    const val DurationSlow = 400
    const val DurationEmphasis = 500

    val EasingStandard = FastOutSlowInEasing
    val EasingDecelerate = LinearOutSlowInEasing
    val EasingAccelerate = FastOutLinearInEasing
    val EasingEmphasized = CubicBezierEasing(0.2f, 0f, 0f, 1f)

    fun tweenFast() = tween<Float>(DurationFast, easing = EasingStandard)
    fun tweenNormal() = tween<Float>(DurationNormal, easing = EasingStandard)
    fun tweenSlow() = tween<Float>(DurationSlow, easing = EasingDecelerate)

    /**
     * 系统「移除动画」或 Animator 时长为 0 时返回 false。
     */
    @Composable
    fun isEnabled(): Boolean {
        val context = LocalContext.current
        return remember(context) {
            try {
                val scale = Settings.Global.getFloat(
                    context.contentResolver,
                    Settings.Global.ANIMATOR_DURATION_SCALE,
                    1f,
                )
                scale > 0f
            } catch (_: Exception) {
                true
            }
        }
    }

    @Composable
    fun durationMs(base: Int): Int = if (isEnabled()) base else DurationInstant
}
