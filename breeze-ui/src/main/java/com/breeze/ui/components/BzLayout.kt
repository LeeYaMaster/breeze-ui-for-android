package com.breeze.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens

/**
 * Flex 布局（`bz-flex` / `bz-flex-item`）。
 */
@Composable
fun BzFlex(
    modifier: Modifier = Modifier,
    justify: Arrangement.Horizontal = Arrangement.Start,
    align: Alignment.Vertical = Alignment.CenterVertically,
    content: @Composable RowScope.() -> Unit,
) {
    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = justify,
        verticalAlignment = align,
        content = content,
    )
}

@Composable
fun RowScope.BzFlexItem(
    modifier: Modifier = Modifier,
    weight: Float? = null,
    content: @Composable () -> Unit,
) {
    Box(
        modifier = modifier.then(
            if (weight != null) Modifier.weight(weight) else Modifier,
        ),
    ) {
        content()
    }
}

/**
 * 宫格（`bz-grid`）。
 */
@Composable
fun BzGrid(
    columns: Int,
    modifier: Modifier = Modifier,
    items: List<@Composable () -> Unit>,
) {
    Column(modifier.fillMaxWidth()) {
        items.chunked(columns).forEach { rowItems ->
            Row(Modifier.fillMaxWidth()) {
                rowItems.forEach { item ->
                    Box(Modifier.weight(1f).padding(8.dp), contentAlignment = Alignment.Center) {
                        item()
                    }
                }
                repeat(columns - rowItems.size) {
                    Box(Modifier.weight(1f))
                }
            }
        }
    }
}

/**
 * 标题栏（`bz-title-bar`）。
 */
@Composable
fun BzTitleBar(
    title: String,
    modifier: Modifier = Modifier,
    showBack: Boolean = false,
    onBack: (() -> Unit)? = null,
    useGradient: Boolean = false,
    actions: @Composable (() -> Unit)? = null,
) {
    val bgMod = if (useGradient) {
        Modifier.background(BreezeTheme.colors.variant.gradientBrush)
    } else {
        Modifier.background(BreezeTokens.White)
    }
    Row(
        modifier
            .fillMaxWidth()
            .then(bgMod)
            .statusBarsPadding()
            .height(48.dp)
            .padding(horizontal = 4.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        if (showBack && onBack != null) {
            IconButton(onClick = onBack) {
                Icon(
                    Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "返回",
                    tint = if (useGradient) BreezeTokens.White else BreezeTheme.colors.textPrimary,
                )
            }
        } else {
            Box(Modifier.padding(start = 8.dp))
        }
        Text(
            title,
            modifier = Modifier.weight(1f),
            textAlign = TextAlign.Center,
            fontWeight = FontWeight.SemiBold,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            color = if (useGradient) BreezeTokens.White else BreezeTheme.colors.textPrimary,
        )
        Box(Modifier.padding(end = 8.dp)) {
            actions?.invoke()
        }
    }
}
