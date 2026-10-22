package com.breeze.ui.components

import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.breeze.ui.theme.BreezeMotion
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens
import com.breeze.ui.theme.bzClickable

enum class BzButtonSize { Sm, Md, Lg }

/**
 * 按钮（对应 `bz-button`）。
 *
 * @param pulseHint 主按钮空闲时的轻微呼吸动效（适合 CTA）
 */
@Composable
fun BzButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    text: String? = null,
    enabled: Boolean = true,
    loading: Boolean = false,
    block: Boolean = false,
    round: Boolean = false,
    radius: Boolean = true,
    iconOnly: Boolean = false,
    size: BzButtonSize = BzButtonSize.Md,
    lineColor: String? = null,
    bgColor: String? = null,
    useTheme: Boolean = bgColor == null || bgColor == "theme" || bgColor == "gradient",
    pulseHint: Boolean = false,
    content: @Composable (() -> Unit)? = null,
) {
    val interaction = remember { MutableInteractionSource() }
    val pressed by interaction.collectIsPressedAsState()
    val motion = BreezeMotion.isEnabled()
    val pressScale by animateFloatAsState(
        targetValue = if (motion && pressed) 0.97f else 1f,
        animationSpec = tween(BreezeMotion.durationMs(BreezeMotion.DurationFast), easing = BreezeMotion.EasingStandard),
        label = "btnPress",
    )
    val infinite = rememberInfiniteTransition(label = "btnPulse")
    val pulse by infinite.animateFloat(
        initialValue = 1f,
        targetValue = if (pulseHint && motion && enabled && !loading) 1.03f else 1f,
        animationSpec = infiniteRepeatable(
            tween(BreezeMotion.DurationEmphasis, easing = BreezeMotion.EasingDecelerate),
            RepeatMode.Reverse,
        ),
        label = "pulse",
    )
    val height = when (size) {
        BzButtonSize.Sm -> 24.dp
        BzButtonSize.Md -> 32.dp
        BzButtonSize.Lg -> 40.dp
    }
    val fontSize = when (size) {
        BzButtonSize.Sm -> 10.sp
        BzButtonSize.Md -> 14.sp
        BzButtonSize.Lg -> 16.sp
    }
    val shape = when {
        round || iconOnly -> CircleShape
        radius -> RoundedCornerShape(BreezeTheme.radius.md)
        else -> RoundedCornerShape(0.dp)
    }
    val line = lineColor != null
    val isGradient = bgColor == "gradient"
    val bg = when {
        line -> Color.Transparent
        isGradient -> Color.Transparent
        useTheme && (bgColor == null || bgColor == "theme") -> BreezeTheme.colors.primary
        else -> BreezeTokens.namedColor(bgColor) ?: BreezeTheme.colors.buttonNeutral
    }
    val contentColor = when {
        line -> BreezeTokens.namedColor(lineColor) ?: BreezeTheme.colors.primary
        useTheme && !line -> BreezeTokens.White
        bg == BreezeTheme.colors.buttonNeutral -> BreezeTokens.Black
        else -> BreezeTokens.White
    }
    val brush = if (!line && isGradient) BreezeTheme.colors.variant.gradientBrush else null

    val baseMod = modifier
        .scale(pressScale * pulse)
        .then(if (block) Modifier.fillMaxWidth() else Modifier)
        .defaultMinSize(minHeight = height)
        .height(height)
        .clip(shape)
        .then(
            if (brush != null) Modifier.background(brush)
            else Modifier.background(bg),
        )
        .then(
            if (line) {
                Modifier.border(
                    1.dp,
                    SolidColor(BreezeTokens.namedColor(lineColor) ?: BreezeTheme.colors.primary),
                    shape,
                )
            } else Modifier,
        )
        .bzClickable(enabled = enabled && !loading, interactionSource = interaction, onClick = onClick)
        .padding(horizontal = if (iconOnly) 0.dp else when (size) {
            BzButtonSize.Sm -> 10.dp
            BzButtonSize.Md -> 15.dp
            BzButtonSize.Lg -> 20.dp
        })

    Box(baseMod, contentAlignment = Alignment.Center) {
        if (loading) {
            CircularProgressIndicator(
                modifier = Modifier.size(18.dp),
                color = contentColor,
                strokeWidth = 2.dp,
            )
        } else {
            Row(horizontalArrangement = Arrangement.Center, verticalAlignment = Alignment.CenterVertically) {
                content?.invoke()
                text?.let {
                    Text(it, color = contentColor, fontSize = fontSize, fontWeight = FontWeight.Medium)
                }
            }
        }
    }
}
