package com.breeze.ui.theme

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
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.shape.RoundedCornerShape

/**
 * 当前主题语义色（主色 / 辅色 / 浅色 / 渐变）。
 */
data class BreezeColors(
    val primary: Color,
    val secondary: Color,
    val light: Color,
    val variant: BreezeThemeVariant,
    val pageBackground: Color = BreezeTokens.GhostWhite,
    val textPrimary: Color = BreezeTokens.Black,
    val textSecondary: Color = BreezeTokens.DarkGray,
    val divider: Color = Color(0xFFE5E5E5),
    val buttonNeutral: Color = Color(0xFFF0F0F0),
)

val LocalBreezeColors = staticCompositionLocalOf {
    BreezeColors(
        primary = BreezeThemeVariant.Default.primary,
        secondary = BreezeThemeVariant.Default.secondary,
        light = BreezeThemeVariant.Default.light,
        variant = BreezeThemeVariant.Default,
    )
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
}

private val BreezeTypography = Typography(
    bodyLarge = TextStyle(fontSize = 16.sp, fontWeight = FontWeight.Normal, color = BreezeTokens.Black),
    bodyMedium = TextStyle(fontSize = 14.sp, fontWeight = FontWeight.Normal, color = BreezeTokens.Black),
    bodySmall = TextStyle(fontSize = 12.sp, fontWeight = FontWeight.Normal, color = BreezeTokens.DarkGray),
    titleLarge = TextStyle(fontSize = 20.sp, fontWeight = FontWeight.SemiBold, color = BreezeTokens.Black),
    titleMedium = TextStyle(fontSize = 17.sp, fontWeight = FontWeight.SemiBold, color = BreezeTokens.Black),
    labelMedium = TextStyle(fontSize = 14.sp, fontWeight = FontWeight.Medium, color = BreezeTokens.Black),
)

private val BreezeShapes = Shapes(
    small = RoundedCornerShape(6.dp),
    medium = RoundedCornerShape(8.dp),
    large = RoundedCornerShape(12.dp),
)

/**
 * Breeze UI For Android 根主题。视觉遵循 Breeze 品牌色，Material3 仅作排版与无障碍 plumbing。
 * 动效令牌见 [BreezeMotion]。
 *
 * @param variant 主题变体（default / blue / purple / orange / red / cyan）
 */
@Composable
fun BreezeTheme(
    variant: BreezeThemeVariant = BreezeThemeController.currentVariant,
    radius: BreezeRadius = BreezeRadius.Md,
    content: @Composable () -> Unit,
) {
    val breezeColors = BreezeColors(
        primary = variant.primary,
        secondary = variant.secondary,
        light = variant.light,
        variant = variant,
    )
    val material = lightColorScheme(
        primary = variant.primary,
        secondary = variant.secondary,
        tertiary = variant.secondary,
        background = breezeColors.pageBackground,
        surface = BreezeTokens.White,
        onPrimary = BreezeTokens.White,
        onSecondary = BreezeTokens.White,
        onBackground = breezeColors.textPrimary,
        onSurface = breezeColors.textPrimary,
        outline = breezeColors.divider,
    )
    CompositionLocalProvider(
        LocalBreezeColors provides breezeColors,
        LocalBreezeRadius provides radius,
    ) {
        MaterialTheme(
            colorScheme = material,
            typography = BreezeTypography,
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
