package com.breeze.ui.imperative

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.compose.animation.scaleOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.breeze.ui.theme.BreezeMotion
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens
import com.breeze.ui.theme.bzClickable
import kotlinx.coroutines.delay

@Composable
internal fun BzOverlayHost(state: BzOverlayState) {
    DisposableEffect(state) {
        BzOverlayRegistry.attach(state)
        onDispose { BzOverlayRegistry.detach(state) }
    }

    val toast = state.toast
    LaunchedEffect(toast) {
        if (toast != null && toast.icon != ToastIcon.Loading && toast.durationMs > 0) {
            delay(toast.durationMs)
            if (state.toast == toast) state.toast = null
        }
    }

    val toastTop = state.toastTop
    LaunchedEffect(toastTop) {
        if (toastTop != null && toastTop.durationMs > 0) {
            delay(toastTop.durationMs)
            if (state.toastTop == toastTop) state.toastTop = null
        }
    }

    val motionMs = BreezeMotion.durationMs(BreezeMotion.DurationNormal)
    val fastMs = BreezeMotion.durationMs(BreezeMotion.DurationFast)

    Box(Modifier.fillMaxSize()) {
        AnimatedVisibility(
            visible = toastTop != null,
            modifier = Modifier.align(Alignment.TopCenter).statusBarsPadding(),
            enter = fadeIn(tween(motionMs)) + slideInVertically(tween(motionMs)) { -it },
            exit = fadeOut(tween(fastMs)) + slideOutVertically(tween(fastMs)) { -it },
        ) {
            toastTop?.let { top ->
                val bg = if (top.success) BreezeTokens.GreenLight else BreezeTokens.RedLight
                val fg = if (top.success) BreezeTokens.Green else BreezeTokens.Red
                Text(
                    top.message,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 12.dp, vertical = 8.dp)
                        .clip(RoundedCornerShape(0.dp))
                        .background(bg)
                        .padding(12.dp),
                    color = fg,
                    textAlign = TextAlign.Center,
                    fontWeight = FontWeight.Medium,
                )
            }
        }

        AnimatedVisibility(
            visible = toast != null,
            enter = fadeIn(tween(motionMs)) + scaleIn(tween(motionMs), initialScale = 0.92f),
            exit = fadeOut(tween(fastMs)) + scaleOut(tween(fastMs), targetScale = 0.92f),
        ) {
            toast?.let { req ->
                Box(
                    Modifier
                        .fillMaxSize()
                        .padding(24.dp),
                    contentAlignment = Alignment.Center,
                ) {
                    Column(
                        Modifier
                            .clip(RoundedCornerShape(12.dp))
                            .background(Color(0xCC000000))
                            .padding(horizontal = 24.dp, vertical = 16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        when (req.icon) {
                            ToastIcon.Loading -> CircularProgressIndicator(
                                modifier = Modifier.size(28.dp),
                                color = BreezeTokens.White,
                                strokeWidth = 2.dp,
                            )
                            ToastIcon.Success -> Text("✓", color = BreezeTokens.White, fontWeight = FontWeight.Bold)
                            ToastIcon.Error -> Text("!", color = BreezeTokens.White, fontWeight = FontWeight.Bold)
                            ToastIcon.None -> Unit
                        }
                        if (req.icon != ToastIcon.None) Spacer(Modifier.height(8.dp))
                        Text(req.message, color = BreezeTokens.White, textAlign = TextAlign.Center)
                    }
                }
            }
        }

        if (state.modal != null) {
            val modal = state.modal!!
            Dialog(
                onDismissRequest = {
                    modal.onCancel?.invoke()
                    state.modal = null
                },
                properties = DialogProperties(usePlatformDefaultWidth = false),
            ) {
                AnimatedVisibility(
                    visible = true,
                    enter = fadeIn(tween(motionMs)) + scaleIn(tween(motionMs), initialScale = 0.9f),
                    exit = fadeOut(tween(fastMs)),
                ) {
                    Column(
                        Modifier
                            .fillMaxWidth(0.85f)
                            .clip(RoundedCornerShape(12.dp))
                            .background(BreezeTheme.colors.surface)
                            .padding(top = 20.dp),
                    ) {
                        Text(
                            modal.title,
                            modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp),
                            fontWeight = FontWeight.SemiBold,
                            textAlign = TextAlign.Center,
                        )
                        Text(
                            modal.message,
                            modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp, vertical = 12.dp),
                            color = BreezeTokens.DarkGray,
                            textAlign = TextAlign.Center,
                        )
                        HorizontalDivider(color = BreezeTheme.colors.divider)
                        Row(Modifier.fillMaxWidth()) {
                            if (modal.showCancel) {
                                Box(
                                    Modifier
                                        .weight(1f)
                                        .bzClickable {
                                            modal.onCancel?.invoke()
                                            state.modal = null
                                        }
                                        .padding(vertical = 14.dp),
                                    contentAlignment = Alignment.Center,
                                ) {
                                    Text(modal.cancelText, color = BreezeTokens.DarkGray)
                                }
                                Box(
                                    Modifier
                                        .size(width = 1.dp, height = 48.dp)
                                        .background(BreezeTheme.colors.divider),
                                )
                            }
                            Box(
                                Modifier
                                    .weight(1f)
                                    .bzClickable {
                                        modal.onConfirm?.invoke()
                                        state.modal = null
                                    }
                                    .padding(vertical = 14.dp),
                                contentAlignment = Alignment.Center,
                            ) {
                                Text(modal.confirmText, color = BreezeTheme.colors.primary, fontWeight = FontWeight.Medium)
                            }
                        }
                    }
                }
            }
        }

        AnimatedVisibility(
            visible = state.actionSheet != null,
            enter = fadeIn(tween(motionMs)) + slideInVertically(tween(motionMs)) { it },
            exit = fadeOut(tween(fastMs)) + slideOutVertically(tween(fastMs)) { it },
        ) {
            val sheet = state.actionSheet
            if (sheet != null) {
                Box(
                    Modifier
                        .fillMaxSize()
                        .background(Color(0x66000000))
                        .bzClickable(
                            enabled = true,
                            interactionSource = remember { MutableInteractionSource() },
                            onClick = { BzActionSheet.hide() },
                        ),
                ) {
                    Column(
                        Modifier
                            .align(Alignment.BottomCenter)
                            .fillMaxWidth()
                            .padding(12.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp),
                    ) {
                        Column(
                            Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(12.dp))
                                .background(BreezeTheme.colors.surface),
                        ) {
                            sheet.title?.let {
                                Text(
                                    it,
                                    modifier = Modifier.fillMaxWidth().padding(16.dp),
                                    textAlign = TextAlign.Center,
                                    color = BreezeTokens.Grey,
                                )
                                HorizontalDivider()
                            }
                            sheet.items.forEachIndexed { index, item ->
                                Box(
                                    Modifier
                                        .fillMaxWidth()
                                        .bzClickable {
                                            item.onClick()
                                            BzActionSheet.hide()
                                        }
                                        .padding(vertical = 16.dp),
                                    contentAlignment = Alignment.Center,
                                ) {
                                    Text(
                                        item.label,
                                        color = if (item.destructive) BreezeTokens.Red else BreezeTheme.colors.primary,
                                        fontWeight = FontWeight.Medium,
                                    )
                                }
                                if (index < sheet.items.lastIndex) HorizontalDivider()
                            }
                        }
                        Box(
                            Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(12.dp))
                                .background(BreezeTheme.colors.surface)
                                .bzClickable { BzActionSheet.hide() }
                                .padding(vertical = 16.dp),
                            contentAlignment = Alignment.Center,
                        ) {
                            Text(sheet.cancelText, fontWeight = FontWeight.SemiBold)
                        }
                    }
                }
            }
        }
    }
}
