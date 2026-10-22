package com.breeze.ui.components

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.unit.sp
import com.breeze.ui.theme.BreezeColors
import com.breeze.ui.theme.BreezeRadius
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeThemeVariant
import com.breeze.ui.theme.LocalBreezeColors
import com.breeze.ui.theme.LocalBreezeRadius

val LocalBreezeFontScale = compositionLocalOf { 1f }

/**
 * 局部主题 / 圆角 / 字号（对应 `bz-config-provider`）。
 */
@Composable
fun BzConfigProvider(
    theme: BreezeThemeVariant? = null,
    radius: BreezeRadius? = null,
    fontScale: Float = LocalBreezeFontScale.current,
    content: @Composable () -> Unit,
) {
    val base = BreezeTheme.colors
    val variant = theme ?: base.variant
    val colors = if (theme != null) {
        BreezeColors(
            primary = variant.primary,
            secondary = variant.secondary,
            light = variant.light,
            variant = variant,
        )
    } else base

    CompositionLocalProvider(
        LocalBreezeColors provides colors,
        LocalBreezeRadius provides (radius ?: BreezeTheme.radius),
        LocalBreezeFontScale provides fontScale,
    ) {
        content()
    }
}
