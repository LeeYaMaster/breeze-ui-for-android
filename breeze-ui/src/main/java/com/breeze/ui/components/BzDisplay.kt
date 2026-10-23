package com.breeze.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.breeze.ui.theme.BreezeMotion
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens
import com.breeze.ui.theme.bzClickable

/**
 * 图标（`bz-icon`），默认使用 Material 矢量图标作为载体。
 */
@Composable
fun BzIcon(
    imageVector: ImageVector,
    modifier: Modifier = Modifier,
    tint: Color = BreezeTheme.colors.textPrimary,
    size: Dp = 24.dp,
    contentDescription: String? = null,
) {
    Icon(imageVector, contentDescription, modifier.then(Modifier.size(size)), tint = tint)
}

/**
 * 标签（`bz-tag`）。
 */
@Composable
fun BzTag(
    text: String,
    modifier: Modifier = Modifier,
    colorName: String = "theme",
    light: Boolean = false,
    round: Boolean = true,
    onClick: (() -> Unit)? = null,
) {
    val bg = when {
        colorName == "theme" && light -> BreezeTheme.colors.light
        colorName == "theme" -> BreezeTheme.colors.primary
        light -> BreezeTokens.namedLightColor(colorName) ?: BreezeTheme.colors.light
        else -> BreezeTokens.namedColor(colorName) ?: BreezeTheme.colors.primary
    }
    val fg = if (light || colorName == "theme" && light) BreezeTheme.colors.primary
    else if (!light && colorName != "theme") BreezeTokens.White
    else BreezeTokens.White
    val textColor = if (light) {
        if (colorName == "theme") BreezeTheme.colors.primary
        else BreezeTokens.namedColor(colorName) ?: BreezeTheme.colors.primary
    } else fg

    Text(
        text,
        modifier = modifier
            .clip(if (round) RoundedCornerShape(4.dp) else RoundedCornerShape(BreezeTheme.radius.sm))
            .background(bg)
            .then(if (onClick != null) Modifier.bzClickable(onClick = onClick) else Modifier)
            .padding(horizontal = 8.dp, vertical = 4.dp),
        color = textColor,
        fontSize = 12.sp,
    )
}

/**
 * 列表单元格（`bz-cell`）。
 */
@Composable
fun BzCell(
    title: String,
    modifier: Modifier = Modifier,
    subtitle: String? = null,
    value: String? = null,
    showArrow: Boolean = false,
    onClick: (() -> Unit)? = null,
    leading: @Composable (() -> Unit)? = null,
) {
    Row(
        modifier
            .fillMaxWidth()
            .background(BreezeTokens.White)
            .then(if (onClick != null) Modifier.bzClickable(onClick = onClick) else Modifier)
            .padding(horizontal = 16.dp, vertical = 14.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        leading?.invoke()
        Column(Modifier.weight(1f).padding(start = if (leading != null) 12.dp else 0.dp)) {
            Text(title, fontWeight = FontWeight.Medium)
            subtitle?.let { Text(it, color = BreezeTokens.Grey, fontSize = 12.sp) }
        }
        value?.let { Text(it, color = BreezeTokens.Grey, fontSize = 14.sp) }
        if (showArrow) Text("›", color = BreezeTokens.Grey, modifier = Modifier.padding(start = 8.dp))
    }
}

/**
 * 头像（`bz-avatar`）。
 */
@Composable
fun BzAvatar(
    modifier: Modifier = Modifier,
    size: Dp = 48.dp,
    imageUrl: String? = null,
    label: String? = null,
    showAttentionPulse: Boolean = false,
) {
    val pulseTransition = rememberInfiniteTransition(label = "avatarPulse")
    val pulseAlpha by pulseTransition.animateFloat(
        initialValue = 0.35f,
        targetValue = if (showAttentionPulse && BreezeMotion.isEnabled()) 0f else 0.35f,
        animationSpec = infiniteRepeatable(tween(BreezeMotion.DurationSlow), RepeatMode.Reverse),
        label = "pulseA",
    )
    Box(contentAlignment = Alignment.Center) {
        if (showAttentionPulse) {
            Box(
                Modifier
                    .size(size + 8.dp)
                    .clip(CircleShape)
                    .background(BreezeTheme.colors.primary.copy(alpha = pulseAlpha)),
            )
        }
        Box(
            modifier
                .size(size)
                .clip(CircleShape)
                .background(BreezeTheme.colors.light),
            contentAlignment = Alignment.Center,
        ) {
        if (!label.isNullOrBlank()) {
            Text(label.take(1), color = BreezeTheme.colors.primary, fontWeight = FontWeight.Bold)
        } else {
            Icon(Icons.Default.Person, null, tint = BreezeTheme.colors.primary)
        }
        }
    }
}

/**
 * 头像组（`bz-avatar-group`）。
 */
@Composable
fun BzAvatarGroup(
    modifier: Modifier = Modifier,
    overlap: Dp = 12.dp,
    content: @Composable () -> Unit,
) {
    Row(modifier, horizontalArrangement = Arrangement.Start) {
        content()
    }
}

@Composable
fun BzAvatarGroupItem(
    index: Int,
    overlap: Dp = 12.dp,
    content: @Composable () -> Unit,
) {
    Box(Modifier.offset(x = if (index == 0) 0.dp else -overlap * index)) {
        content()
    }
}

/**
 * 进度条（`bz-progress`）。
 */
@Composable
fun BzProgress(
    progress: Float,
    modifier: Modifier = Modifier,
    color: Color = BreezeTheme.colors.primary,
    indeterminate: Boolean = false,
    circular: Boolean = false,
) {
    val trackMod = modifier
        .then(if (!circular) Modifier.fillMaxWidth().height(6.dp).clip(RoundedCornerShape(3.dp)) else Modifier.size(48.dp))
    if (indeterminate) {
        if (circular) {
            CircularProgressIndicator(
                modifier = trackMod,
                color = color,
                strokeWidth = 4.dp,
            )
        } else {
            LinearProgressIndicator(
                modifier = trackMod,
                color = color,
                trackColor = BreezeTheme.colors.light,
            )
        }
        return
    }
    val animated by animateFloatAsState(
        targetValue = progress.coerceIn(0f, 1f),
        animationSpec = BreezeMotion.springSmooth(stiffness = Spring.StiffnessLow),
        label = "progress",
    )
    if (circular) {
        CircularProgressIndicator(
            progress = { animated },
            modifier = trackMod,
            color = color,
            strokeWidth = 4.dp,
            trackColor = BreezeTheme.colors.light,
        )
    } else {
        LinearProgressIndicator(
            progress = { animated },
            modifier = trackMod,
            color = color,
            trackColor = BreezeTheme.colors.light,
        )
    }
}

/**
 * 加载（`bz-loading`）。
 */
@Composable
fun BzLoading(
    modifier: Modifier = Modifier,
    text: String? = "加载中…",
    size: Dp = 32.dp,
) {
    val wave = rememberInfiniteTransition(label = "loadWave")
    val scale by wave.animateFloat(
        initialValue = 0.88f,
        targetValue = if (BreezeMotion.isEnabled()) 1.1f else 1f,
        animationSpec = infiniteRepeatable(
            tween(BreezeMotion.durationMs(BreezeMotion.DurationSlow), easing = BreezeMotion.EasingEmphasized),
            RepeatMode.Reverse,
        ),
        label = "loadScale",
    )
    Column(modifier, horizontalAlignment = Alignment.CenterHorizontally) {
        CircularProgressIndicator(
            modifier = Modifier.size(size * scale),
            color = BreezeTheme.colors.primary,
            strokeWidth = 3.dp,
        )
        text?.let { Text(it, modifier = Modifier.padding(top = 8.dp), color = BreezeTokens.Grey, fontSize = 14.sp) }
    }
}
