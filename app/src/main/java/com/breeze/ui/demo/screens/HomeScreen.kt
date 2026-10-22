package com.breeze.ui.demo.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.breeze.ui.components.BzCell
import com.breeze.ui.components.BzPage
import com.breeze.ui.components.BzSegment
import com.breeze.ui.components.BzTitleBar
import com.breeze.ui.theme.BreezeThemeVariant

private data class DemoCategory(val id: String, val title: String)

private val categories = listOf(
    DemoCategory("nav", "导航与布局"),
    DemoCategory("form", "表单与输入"),
    DemoCategory("feedback", "反馈与展示"),
    DemoCategory("list", "列表与卡片"),
    DemoCategory("imperative", "命令式 API"),
    DemoCategory("extended", "扩展组件"),
)

@Composable
fun HomeScreen(
    onOpenCategory: (String) -> Unit,
    onThemeChange: (BreezeThemeVariant) -> Unit,
) {
    var themeIndex by remember { androidx.compose.runtime.mutableIntStateOf(0) }
    val variants = BreezeThemeVariant.entries

    BzPage {
        BzTitleBar(title = "Breeze UI For Android", useGradient = true)
        Column(
            Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
        ) {
            BzSegment(
                options = variants.map { it.displayName },
                selectedIndex = themeIndex,
                onSelected = {
                    themeIndex = it
                    onThemeChange(variants[it])
                },
                modifier = Modifier.padding(bottom = 16.dp),
            )
            categories.forEach { cat ->
                BzCell(
                    title = cat.title,
                    showArrow = true,
                    onClick = { onOpenCategory(cat.id) },
                )
            }
        }
    }
}
