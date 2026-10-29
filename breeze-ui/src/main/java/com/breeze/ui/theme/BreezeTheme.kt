package com.breeze.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 当前主题语义色（主色 / 辅色 / 浅色 / 渐变，以及页面与控件表面色）。
 */
data class BreezeColors(
    val primary: Color,
    val secondary: Color,
    val light: Color,
    val variant: BreezeThemeVariant,
    val pageBackground: Color = BreezeTokens.GhostWhite,
    val surface: Color = BreezeTokens.White,
    val textPrimary: Color = BreezeTokens.Black,
    val textSecondary: Color = BreezeTokens.DarkGray,
    val divider: Color = Color(0xFFE5E5E5),
    val buttonNeutral: Color = Color(0xFFF0F0F0),
    val isDark: Boolean = false,
) {
    companion object {
        /** 由 [BreezeThemeVariant] 与深浅模式生成完整语义色。 */
        fun fromVariant(variant: BreezeThemeVariant, darkTheme: Boolean): BreezeColors =
            if (darkTheme) {
                BreezeColors(
                    primary = variant.primary,
                    secondary = variant.secondary,
                    light = variant.primary.copy(alpha = 0.22f),
                    variant = variant,
                    pageBackground = Color(0xFF121212),
                    surface = Color(0xFF1E1E1E),
                    textPrimary = Color(0xFFE8E8E8),
                    textSecondary = Color(0xFFAAAAAA),
                    divider = Color(0xFF3D3D3D),
                    buttonNeutral = Color(0xFF2A2A2A),
                    isDark = true,
                )
            } else {
                BreezeColors(
                    primary = variant.primary,
                    secondary = variant.secondary,
                    light = variant.light,
                    variant = variant,
                )
            }
    }
}

val LocalBreezeColors = staticCompositionLocalOf {
    BreezeColors.fromVariant(BreezeThemeVariant.Default, darkTheme = false)
}

val LocalBreezeRadius = compositionLocalOf { BreezeRadius.Md }

data class BreezeRadius(val sm: androidx.compose.ui.unit.Dp, val md: androidx.compose.ui.unit.Dp, val lg: androidx.compose.ui.unit.Dp) {
    companion object {
        val Sm = BreezeRadius(4.dp, 6.dp, 10.dp)
        val Md = BreezeRadius(6.dp, 8.dp, 12.dp)
        val Lg = BreezeRadius(8.dp, 12.dp, 16.dp)
    }
}

object BreezeThemeController {
    var currentVariant by mutableStateOf(BreezeThemeVariant.Default)

    /**
     * 全局深浅色覆盖：`null` 表示跟随系统（[isSystemInDarkTheme]），
     * `true` / `false` 强制深色或浅色（Demo 与单测可用）。
     */
    var darkTheme: Boolean? by mutableStateOf(null)
}

private val BreezeShapes = Shapes(
    small = RoundedCornerShape(6.dp),
    medium = RoundedCornerShape(8.dp),
    large = RoundedCornerShape(12.dp),
)

private fun breezeTypography(colors: BreezeColors) = Typography(
    bodyLarge = TextStyle(fontSize = 16.sp, fontWeight = FontWeight.Normal, color = colors.textPrimary),
    bodyMedium = TextStyle(fontSize = 14.sp, fontWeight = FontWeight.Normal, color = colors.textPrimary),
    bodySmall = TextStyle(fontSize = 12.sp, fontWeight = FontWeight.Normal, color = colors.textSecondary),
    titleLarge = TextStyle(fontSize = 20.sp, fontWeight = FontWeight.SemiBold, color = colors.textPrimary),
    titleMedium = TextStyle(fontSize = 17.sp, fontWeight = FontWeight.SemiBold, color = colors.textPrimary),
    labelMedium = TextStyle(fontSize = 14.sp, fontWeight = FontWeight.Medium, color = colors.textPrimary),
)

private fun materialColorScheme(breezeColors: BreezeColors, variant: BreezeThemeVariant) =
    if (breezeColors.isDark) {
        darkColorScheme(
            primary = variant.primary,
            secondary = variant.secondary,
            tertiary = variant.secondary,
            background = breezeColors.pageBackground,
            surface = breezeColors.surface,
            surfaceVariant = breezeColors.buttonNeutral,
            onPrimary = BreezeTokens.White,
            onSecondary = BreezeTokens.White,
            onBackground = breezeColors.textPrimary,
            onSurface = breezeColors.textPrimary,
            outline = breezeColors.divider,
            error = BreezeTokens.Red,
            onError = BreezeTokens.White,
        )
    } else {
        lightColorScheme(
            primary = variant.primary,
            secondary = variant.secondary,
            tertiary = variant.secondary,
            background = breezeColors.pageBackground,
            surface = breezeColors.surface,
            onPrimary = BreezeTokens.White,
            onSecondary = BreezeTokens.White,
            onBackground = breezeColors.textPrimary,
            onSurface = breezeColors.textPrimary,
            outline = breezeColors.divider,
            error = BreezeTokens.Red,
            onError = BreezeTokens.White,
        )
    }

/**
 * Breeze UI For Android 根主题。视觉遵循 Breeze 品牌色，Material3 作排版与无障碍 plumbing。
 * 动效令牌见 [BreezeMotion]。
 *
 * @param variant 主题变体（default / blue / purple / orange / red / cyan）
 * @param darkTheme 是否使用深色语义色与 [darkColorScheme]；默认跟随系统。
 *   应用级强制深浅可设置 [BreezeThemeController.darkTheme] 并在此省略参数，或显式传入 `darkTheme = true/false`。
 * @param radius 圆角令牌预设
 */
@Composable
fun BreezeTheme(
    variant: BreezeThemeVariant = BreezeThemeController.currentVariant,
    darkTheme: Boolean = BreezeThemeController.darkTheme ?: isSystemInDarkTheme(),
    radius: BreezeRadius = BreezeRadius.Md,
    content: @Composable () -> Unit,
) {
    val breezeColors = BreezeColors.fromVariant(variant, darkTheme)
    val material = materialColorScheme(breezeColors, variant)
    CompositionLocalProvider(
        LocalBreezeColors provides breezeColors,
        LocalBreezeRadius provides radius,
    ) {
        MaterialTheme(
            colorScheme = material,
            typography = breezeTypography(breezeColors),
            shapes = BreezeShapes,
            content = content,
        )
    }
}

/** 读取当前 Breeze 语义色。 */
object BreezeTheme {
    val colors: BreezeColors
        @Composable get() = LocalBreezeColors.current

    val radius: BreezeRadius
        @Composable get() = LocalBreezeRadius.current
}
