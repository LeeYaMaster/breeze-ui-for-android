package com.breeze.ui.components

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens

/**
 * 声明式模态框（`bz-modal`）。命令式请使用 [com.breeze.ui.imperative.BzModal]。
 */
@Composable
fun BzModal(
    visible: Boolean,
    title: String,
    message: String,
    onDismiss: () -> Unit,
    onConfirm: () -> Unit,
    confirmText: String = "确定",
    cancelText: String = "取消",
    showCancel: Boolean = true,
) {
    if (!visible) return
    androidx.compose.ui.window.Dialog(onDismissRequest = onDismiss) {
        Column(
            Modifier
                .clip(RoundedCornerShape(12.dp))
                .background(BreezeTheme.colors.surface)
                .padding(top = 20.dp),
        ) {
            Text(title, modifier = Modifier.fillMaxWidth(), textAlign = TextAlign.Center, fontWeight = FontWeight.SemiBold)
            Text(
                message,
                modifier = Modifier.fillMaxWidth().padding(16.dp),
                textAlign = TextAlign.Center,
                color = BreezeTokens.DarkGray,
            )
            Row(Modifier.fillMaxWidth()) {
                if (showCancel) {
                    Box(
                        Modifier.weight(1f).clickable(onClick = onDismiss).padding(14.dp),
                        contentAlignment = Alignment.Center,
                    ) { Text(cancelText) }
                }
                Box(
                    Modifier.weight(1f).clickable(onClick = onConfirm).padding(14.dp),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(confirmText, color = BreezeTheme.colors.primary, fontWeight = FontWeight.Medium)
                }
            }
        }
    }
}

/** 骨架屏（`bz-skeleton`）。 */
@Composable
fun BzSkeleton(
    modifier: Modifier = Modifier,
    height: androidx.compose.ui.unit.Dp = 16.dp,
) {
    val transition = rememberInfiniteTransition(label = "skel")
    val shift by transition.animateFloat(
        initialValue = 0f,
        targetValue = 1000f,
        animationSpec = infiniteRepeatable(
            tween(com.breeze.ui.theme.BreezeMotion.durationMs(1200).coerceAtLeast(1), easing = LinearEasing),
            RepeatMode.Restart,
        ),
        label = "shift",
    )
    val brush = Brush.linearGradient(
        colors = listOf(Color(0xFFEEEEEE), Color(0xFFF8F8F8), Color(0xFFEEEEEE)),
        start = Offset(shift, 0f),
        end = Offset(shift + 200f, 0f),
    )
    Box(
        modifier
            .fillMaxWidth()
            .height(height)
            .clip(RoundedCornerShape(4.dp))
            .background(brush),
    )
}

/** 空状态（`bz-empty`）。 */
@Composable
fun BzEmpty(
    modifier: Modifier = Modifier,
    title: String = "暂无数据",
    description: String? = null,
    action: @Composable (() -> Unit)? = null,
) {
    Column(
        modifier.fillMaxWidth().padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text("📭", fontSize = 48.sp)
        Text(title, modifier = Modifier.padding(top = 12.dp), fontWeight = FontWeight.Medium)
        description?.let { Text(it, color = BreezeTokens.Grey, textAlign = TextAlign.Center) }
        action?.let { Box(Modifier.padding(top = 16.dp)) { it() } }
    }
}

enum class BzLoadMoreStatus { Idle, Loading, NoMore, Error }

/** 加载更多（`bz-loadmore`）。 */
@Composable
fun BzLoadMore(
    status: BzLoadMoreStatus,
    modifier: Modifier = Modifier,
    onRetry: (() -> Unit)? = null,
) {
    Row(
        modifier.fillMaxWidth().padding(16.dp),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        when (status) {
            BzLoadMoreStatus.Loading -> {
                CircularProgressIndicator(Modifier.size(18.dp), strokeWidth = 2.dp, color = BreezeTheme.colors.primary)
                Text("加载中…", modifier = Modifier.padding(start = 8.dp), color = BreezeTokens.Grey, fontSize = 13.sp)
            }
            BzLoadMoreStatus.NoMore -> Text("没有更多了", color = BreezeTokens.Grey, fontSize = 13.sp)
            BzLoadMoreStatus.Error -> Text(
                "加载失败，点击重试",
                color = BreezeTheme.colors.primary,
                fontSize = 13.sp,
                modifier = Modifier.clickable { onRetry?.invoke() },
            )
            BzLoadMoreStatus.Idle -> Unit
        }
    }
}
