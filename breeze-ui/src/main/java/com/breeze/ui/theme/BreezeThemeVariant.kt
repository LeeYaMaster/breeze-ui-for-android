package com.breeze.ui.theme

import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color

/**
 * 主题变体，对应 `breeze-ui/theme.wxss` 中的 `theme-wrap.theme-*`。
 */
enum class BreezeThemeVariant(
    val id: String,
    val displayName: String,
    val primary: Color,
    val secondary: Color,
    val light: Color,
    val gradient: List<Color>,
) {
    Default(
        id = "theme-default",
        displayName = "Breeze",
        primary = Color(0xFF5B6CFF),
        secondary = Color(0xFF7C3AED),
        light = Color(0xFFEEF0FF),
        gradient = listOf(Color(0xFF5B6CFF), Color(0xFF7C3AED), Color(0xFF22D3EE)),
    ),
    Blue(
        id = "theme-blue",
        displayName = "海蓝",
        primary = Color(0xFF0081FF),
        secondary = Color(0xFF1CBBB4),
        light = Color(0xFFCCE6FF),
        gradient = listOf(Color(0xFF0081FF), Color(0xFF1CBBB4)),
    ),
    Purple(
        id = "theme-purple",
        displayName = "暮紫",
        primary = Color(0xFF6739B6),
        secondary = Color(0xFF9C26B0),
        light = Color(0xFFE1D7F0),
        gradient = listOf(Color(0xFF9000FF), Color(0xFF5E00FF)),
    ),
    Orange(
        id = "theme-orange",
        displayName = "暖橙",
        primary = Color(0xFFF37B1D),
        secondary = Color(0xFFED1C24),
        light = Color(0xFFFDE6D2),
        gradient = listOf(Color(0xFFFF9700), Color(0xFFED1C24)),
    ),
    Red(
        id = "theme-red",
        displayName = "绯红",
        primary = Color(0xFFE54D42),
        secondary = Color(0xFFEC008C),
        light = Color(0xFFFADBD9),
        gradient = listOf(Color(0xFFF43F3B), Color(0xFFEC008C)),
    ),
    Cyan(
        id = "theme-cyan",
        displayName = "青绿",
        primary = Color(0xFF1CBBB4),
        secondary = Color(0xFF10B981),
        light = Color(0xFFD2F1F0),
        gradient = listOf(Color(0xFF1CBBB4), Color(0xFF10B981)),
    );

    val gradientBrush: Brush
        get() = Brush.linearGradient(
            colors = gradient,
            start = androidx.compose.ui.geometry.Offset.Zero,
            end = androidx.compose.ui.geometry.Offset(1000f, 1000f),
        )

    companion object {
        fun fromId(id: String): BreezeThemeVariant =
            entries.find { it.id == id } ?: Default
    }
}
