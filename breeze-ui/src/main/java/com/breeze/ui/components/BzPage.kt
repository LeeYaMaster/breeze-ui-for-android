package com.breeze.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import com.breeze.ui.imperative.BzOverlayHost
import com.breeze.ui.imperative.BzOverlayState
import com.breeze.ui.theme.BreezeTheme

/**
 * 页面容器（对应 `bz-page`），内置 Toast / Modal / ActionSheet 挂载点。
 */
@Composable
fun BzPage(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    val overlayState = remember { BzOverlayState() }
    Box(
        modifier
            .fillMaxSize()
            .background(BreezeTheme.colors.pageBackground),
    ) {
        Box(Modifier.fillMaxSize()) {
            content()
        }
        BzOverlayHost(overlayState)
    }
}
