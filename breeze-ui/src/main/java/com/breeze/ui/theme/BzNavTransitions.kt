package com.breeze.ui.theme

import androidx.compose.animation.AnimatedContentScope
import androidx.compose.animation.AnimatedContentTransitionScope
import androidx.compose.animation.EnterTransition
import androidx.compose.animation.ExitTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.IntOffset
import androidx.navigation.NamedNavArgument
import androidx.navigation.NavBackStackEntry
import androidx.navigation.NavDeepLink
import androidx.navigation.NavGraphBuilder
import androidx.navigation.compose.composable

/**
 * Navigation Compose 页面转场（前进：滑入 + 淡入；返回：反向）。
 *
 * 时长与缓动与 [BreezeMotion] 一致；通过 [rememberBzPageTransitionDuration] 尊重系统动画开关。
 */
object BzNavTransitions {
    /** 页面转场基准时长（ms），落在 Material 常见的 250–320ms 区间。 */
    const val DurationPageMs = 280

    fun forwardEnter(durationMs: Int): EnterTransition =
        pageEnterTransition(durationMs, slideFromEnd = true)

    fun forwardExit(durationMs: Int): ExitTransition =
        pageExitTransition(durationMs, slideToStart = true)

    fun backwardEnter(durationMs: Int): EnterTransition =
        pageEnterTransition(durationMs, slideFromEnd = false)

    fun backwardExit(durationMs: Int): ExitTransition =
        pageExitTransition(durationMs, slideToStart = false)

    private fun pageEnterTransition(durationMs: Int, slideFromEnd: Boolean): EnterTransition {
        if (durationMs <= 0) return EnterTransition.None
        val fadeSpec = tween<Float>(durationMs, easing = BreezeMotion.EasingDecelerate)
        val slideSpec = tween<IntOffset>(durationMs, easing = BreezeMotion.EasingDecelerate)
        val slide = if (slideFromEnd) {
            slideInHorizontally(slideSpec) { fullWidth: Int -> fullWidth }
        } else {
            slideInHorizontally(slideSpec) { fullWidth: Int -> -fullWidth / 4 }
        }
        return fadeIn(fadeSpec) + slide
    }

    private fun pageExitTransition(durationMs: Int, slideToStart: Boolean): ExitTransition {
        if (durationMs <= 0) return ExitTransition.None
        val fadeSpec = tween<Float>(durationMs, easing = BreezeMotion.EasingAccelerate)
        val slideSpec = tween<IntOffset>(durationMs, easing = BreezeMotion.EasingAccelerate)
        val slide = if (slideToStart) {
            slideOutHorizontally(slideSpec) { fullWidth: Int -> -fullWidth / 4 }
        } else {
            slideOutHorizontally(slideSpec) { fullWidth: Int -> fullWidth }
        }
        return fadeOut(fadeSpec) + slide
    }
}

/** 当前页面转场时长；系统 Animator 为 0 时返回 0。 */
@Composable
fun rememberBzPageTransitionDuration(): Int = BreezeMotion.durationMs(BzNavTransitions.DurationPageMs)

private fun AnimatedContentTransitionScope<NavBackStackEntry>.bzScopedForwardEnter(durationMs: Int): EnterTransition {
    if (durationMs <= 0) return EnterTransition.None
    val fadeSpec = tween<Float>(durationMs, easing = BreezeMotion.EasingDecelerate)
    val slideSpec = tween<IntOffset>(durationMs, easing = BreezeMotion.EasingDecelerate)
    return fadeIn(fadeSpec) +
        slideIntoContainer(
            towards = AnimatedContentTransitionScope.SlideDirection.Start,
            animationSpec = slideSpec,
        )
}

private fun AnimatedContentTransitionScope<NavBackStackEntry>.bzScopedForwardExit(durationMs: Int): ExitTransition {
    if (durationMs <= 0) return ExitTransition.None
    val fadeSpec = tween<Float>(durationMs, easing = BreezeMotion.EasingAccelerate)
    val slideSpec = tween<IntOffset>(durationMs, easing = BreezeMotion.EasingAccelerate)
    return fadeOut(fadeSpec) +
        slideOutOfContainer(
            towards = AnimatedContentTransitionScope.SlideDirection.Start,
            animationSpec = slideSpec,
        )
}

private fun AnimatedContentTransitionScope<NavBackStackEntry>.bzScopedBackwardEnter(durationMs: Int): EnterTransition {
    if (durationMs <= 0) return EnterTransition.None
    val fadeSpec = tween<Float>(durationMs, easing = BreezeMotion.EasingDecelerate)
    val slideSpec = tween<IntOffset>(durationMs, easing = BreezeMotion.EasingDecelerate)
    return fadeIn(fadeSpec) +
        slideIntoContainer(
            towards = AnimatedContentTransitionScope.SlideDirection.End,
            animationSpec = slideSpec,
        )
}

private fun AnimatedContentTransitionScope<NavBackStackEntry>.bzScopedBackwardExit(durationMs: Int): ExitTransition {
    if (durationMs <= 0) return ExitTransition.None
    val fadeSpec = tween<Float>(durationMs, easing = BreezeMotion.EasingAccelerate)
    val slideSpec = tween<IntOffset>(durationMs, easing = BreezeMotion.EasingAccelerate)
    return fadeOut(fadeSpec) +
        slideOutOfContainer(
            towards = AnimatedContentTransitionScope.SlideDirection.End,
            animationSpec = slideSpec,
        )
}

/**
 * 带 Breeze 默认页面转场的 [composable] 路由（容器对齐的滑入滑出）。
 *
 * @param transitionDurationMs 一般由 [rememberBzPageTransitionDuration] 在 NavHost 外计算一次后传入。
 */
fun NavGraphBuilder.bzPage(
    route: String,
    transitionDurationMs: Int,
    arguments: List<NamedNavArgument> = emptyList(),
    deepLinks: List<NavDeepLink> = emptyList(),
    content: @Composable AnimatedContentScope.(NavBackStackEntry) -> Unit,
) {
    composable(
        route = route,
        arguments = arguments,
        deepLinks = deepLinks,
        enterTransition = { bzScopedForwardEnter(transitionDurationMs) },
        exitTransition = { bzScopedForwardExit(transitionDurationMs) },
        popEnterTransition = { bzScopedBackwardEnter(transitionDurationMs) },
        popExitTransition = { bzScopedBackwardExit(transitionDurationMs) },
        content = content,
    )
}
