package com.breeze.ui.theme

import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.material3.ripple
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.Dp

/**
 * Breeze 品牌色水波纹点击反馈（非 Material 默认紫色）。
 */
@Composable
fun Modifier.bzClickable(
    enabled: Boolean = true,
    onClickLabel: String? = null,
    role: Role? = null,
    bounded: Boolean = true,
    radius: Dp = Dp.Unspecified,
    onClick: () -> Unit,
): Modifier {
    val primary = BreezeTheme.colors.primary
    val indication = ripple(
        bounded = bounded,
        radius = radius,
        color = primary.copy(alpha = 0.36f),
    )
    val interaction = remember { MutableInteractionSource() }
    return clickable(
        interactionSource = interaction,
        indication = indication,
        enabled = enabled,
        onClickLabel = onClickLabel,
        role = role,
        onClick = onClick,
    )
}

@Composable
fun Modifier.bzClickable(
    enabled: Boolean,
    interactionSource: MutableInteractionSource,
    onClick: () -> Unit,
): Modifier {
    val indication = ripple(color = BreezeTheme.colors.primary.copy(alpha = 0.36f))
    return clickable(
        interactionSource = interactionSource,
        indication = indication,
        enabled = enabled,
        onClick = onClick,
    )
}
