package com.breeze.ui.demo.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Settings
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.breeze.ui.components.BzAvatar
import com.breeze.ui.components.BzAvatarGroup
import com.breeze.ui.components.BzAvatarGroupItem
import com.breeze.ui.components.BzButton
import com.breeze.ui.components.BzButtonSize
import com.breeze.ui.components.BzCard
import com.breeze.ui.components.BzCell
import com.breeze.ui.components.BzCheckbox
import com.breeze.ui.components.BzEmpty
import com.breeze.ui.components.BzFlex
import com.breeze.ui.components.BzFlexItem
import com.breeze.ui.components.BzGrid
import com.breeze.ui.components.BzIcon
import com.breeze.ui.components.BzInput
import com.breeze.ui.components.BzListMenu
import com.breeze.ui.components.BzListMenuItem
import com.breeze.ui.components.BzLoadMore
import com.breeze.ui.components.BzLoadMoreStatus
import com.breeze.ui.components.BzLoading
import com.breeze.ui.components.BzPage
import com.breeze.ui.components.BzProgress
import com.breeze.ui.components.BzRadioGroup
import com.breeze.ui.components.BzRadioOption
import com.breeze.ui.components.BzRate
import com.breeze.ui.components.BzSegment
import com.breeze.ui.components.BzSkeleton
import com.breeze.ui.components.BzSlider
import com.breeze.ui.components.BzStep
import com.breeze.ui.components.BzSteps
import com.breeze.ui.components.BzSwitch
import com.breeze.ui.components.BzTabs
import com.breeze.ui.components.BzTag
import com.breeze.ui.components.BzTextarea
import com.breeze.ui.components.BzTitleBar
import com.breeze.ui.imperative.BzActionSheet
import com.breeze.ui.imperative.BzActionSheetItem
import com.breeze.ui.imperative.BzModal
import com.breeze.ui.components.BzCheckboxGroup
import com.breeze.ui.components.BzCheckboxOption
import com.breeze.ui.components.BzChatMessage
import com.breeze.ui.components.BzChoose
import com.breeze.ui.components.BzForm
import com.breeze.ui.components.BzFormField
import com.breeze.ui.components.BzListMessage
import com.breeze.ui.components.BzStateBox
import com.breeze.ui.components.BzStateBoxView
import com.breeze.ui.imperative.BzToast
import com.breeze.ui.imperative.BzToastTop
import com.breeze.ui.components.BzCalendar
import com.breeze.ui.components.BzColorPicker
import com.breeze.ui.components.BzConfigProvider
import com.breeze.ui.components.BzCustomNavPro
import com.breeze.ui.components.BzDoubleSlider
import com.breeze.ui.components.BzPicker
import com.breeze.ui.components.BzPullRefresh
import com.breeze.ui.components.BzStickyHeader
import com.breeze.ui.components.BzTable
import com.breeze.ui.components.BzTableColumn
import com.breeze.ui.components.BzTimeline
import com.breeze.ui.components.BzTimelineEntry
import com.breeze.ui.components.BzTooltip
import com.breeze.ui.components.BzUpload
import com.breeze.ui.components.BzWaterfallFlow
import com.breeze.ui.components.BzWaterfallItem
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeThemeVariant
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.ui.graphics.Color
import java.time.LocalDate

@Composable
fun DemoCategoryScreen(categoryId: String, onBack: () -> Unit) {
    val title = when (categoryId) {
        "nav" -> "导航与布局"
        "form" -> "表单与输入"
        "feedback" -> "反馈与展示"
        "list" -> "列表与卡片"
        "imperative" -> "命令式 API"
        "extended" -> "扩展组件"
        else -> "演示"
    }
    BzPage {
        BzTitleBar(title = title, showBack = true, onBack = onBack)
        Column(
            Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            when (categoryId) {
                "nav" -> NavDemos()
                "form" -> FormDemos()
                "feedback" -> FeedbackDemos()
                "list" -> ListDemos()
                "imperative" -> ImperativeDemos()
                "extended" -> ExtendedDemos()
            }
        }
    }
}

@Composable
private fun NavDemos() {
    BzButton(text = "主题按钮", onClick = {}, block = true, pulseHint = true)
    BzFlex(justify = Arrangement.SpaceBetween) {
        BzFlexItem(weight = 1f) { BzButton(text = "小", onClick = {}, size = BzButtonSize.Sm) }
        BzFlexItem(weight = 1f) { BzButton(text = "大", onClick = {}, size = BzButtonSize.Lg) }
    }
    BzGrid(
        columns = 3,
        items = listOf("首页", "收藏", "设置").map { label ->
            {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    BzIcon(Icons.Default.Home, tint = BreezeTheme.colors.primary)
                    BzTag(text = label, light = true)
                }
            }
        },
    )
    BzCell(title = "单元格", subtitle = "副标题", value = "详情", showArrow = true)
    BzTag(text = "标签", colorName = "theme")
    BzTag(text = "成功", colorName = "green", light = true)
    RowAvatars()
    BzProgress(progress = 0.65f)
    BzLoading()
}

@Composable
private fun RowAvatars() {
    BzAvatarGroup {
        listOf("A", "B", "C").forEachIndexed { i, l ->
            BzAvatarGroupItem(index = i) {
                BzAvatar(label = l, size = 40.dp, showAttentionPulse = i == 0)
            }
        }
    }
}

@Composable
private fun FormDemos() {
    var text by remember { mutableStateOf("") }
    var area by remember { mutableStateOf("") }
    var on by remember { mutableStateOf(true) }
    var checked by remember { mutableStateOf(false) }
    var radio by remember { mutableStateOf("a") }
    var rate by remember { mutableIntStateOf(3) }
    var slider by remember { mutableFloatStateOf(40f) }
    var checks by remember { mutableStateOf(setOf("a")) }
    var choose by remember { mutableStateOf(setOf("包邮")) }
    var boxState by remember { mutableStateOf(BzStateBoxView.Content) }
    BzForm {
        BzFormField(label = "昵称", required = true, errorMessage = if (text.isEmpty()) "必填" else null) {
            BzInput(value = text, onValueChange = { text = it }, placeholder = "请输入")
        }
    }
    BzCheckboxGroup(
        options = listOf(BzCheckboxOption("a", "选项 A"), BzCheckboxOption("b", "选项 B")),
        checked = checks,
        onCheckedChange = { checks = it },
    )
    BzChoose(options = listOf("包邮", "自提", "同城"), selected = choose, onSelected = { choose = it })
    BzStateBox(
        state = boxState,
        onRetry = { boxState = BzStateBoxView.Content },
        modifier = Modifier.fillMaxWidth(),
    ) {
        BzListMessage(
            messages = listOf(
                BzChatMessage("1", "你好，Breeze UI！", isSelf = false, time = "10:00"),
                BzChatMessage("2", "收到", isSelf = true, time = "10:01"),
            ),
        )
    }
    RowActions(boxState) { boxState = it }
    BzTextarea(value = area, onValueChange = { area = it }, placeholder = "多行输入")
    androidx.compose.foundation.layout.Row(
        Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        androidx.compose.material3.Text("开关", Modifier.weight(1f))
        BzSwitch(checked = on, onCheckedChange = { on = it })
    }
    BzCheckbox(checked = checked, onCheckedChange = { checked = it }, label = "同意协议")
    BzRadioGroup(
        options = listOf(BzRadioOption("a", "选项 A"), BzRadioOption("b", "选项 B")),
        selected = radio,
        onSelected = { radio = it },
    )
    BzRate(value = rate, onValueChange = { rate = it })
    BzSlider(value = slider, onValueChange = { slider = it })
}

@Composable
private fun FeedbackDemos() {
    BzSkeleton(height = 20.dp)
    BzSkeleton(height = 20.dp, modifier = Modifier.fillMaxWidth(0.7f))
    BzEmpty(title = "暂无订单", description = "去逛逛吧") {
        BzButton(text = "去首页", onClick = {})
    }
    BzLoadMore(status = BzLoadMoreStatus.Loading)
    BzLoadMore(status = BzLoadMoreStatus.NoMore)
}

@Composable
private fun ListDemos() {
    var tab by remember { mutableIntStateOf(0) }
    var seg by remember { mutableIntStateOf(0) }
    BzTabs(tabs = listOf("推荐", "关注", "附近"), selectedIndex = tab, onSelected = { tab = it })
    BzSegment(options = listOf("日", "周", "月"), selectedIndex = seg, onSelected = { seg = it })
    BzCard(title = "卡片标题") {
        androidx.compose.material3.Text("卡片内容区域，圆角与主题色来自 BreezeTheme。")
    }
    BzListMenu {
        BzListMenuItem("菜单项一", icon = { BzIcon(Icons.Default.Home) }, onClick = {})
        BzListMenuItem("菜单项二", icon = { BzIcon(Icons.Default.Favorite) })
    }
    BzSteps(
        steps = listOf(
            BzStep("提交", "填写信息"),
            BzStep("审核", "等待处理"),
            BzStep("完成"),
        ),
        current = 1,
    )
}

@Composable
private fun RowActions(state: BzStateBoxView, onState: (BzStateBoxView) -> Unit) {
    BzFlex {
        BzFlexItem(weight = 1f) { BzButton(text = "加载", onClick = { onState(BzStateBoxView.Loading) }, size = BzButtonSize.Sm) }
        BzFlexItem(weight = 1f) { BzButton(text = "空", onClick = { onState(BzStateBoxView.Empty) }, size = BzButtonSize.Sm) }
        BzFlexItem(weight = 1f) { BzButton(text = "内容", onClick = { onState(BzStateBoxView.Content) }, size = BzButtonSize.Sm) }
    }
}

@Composable
private fun ImperativeDemos() {
    BzButton(text = "Toast", onClick = { BzToast.show("操作成功") }, block = true)
    BzButton(text = "顶部 Toast", onClick = { BzToastTop.show("网络已恢复", success = true) }, block = true)
    BzButton(text = "Modal", onClick = {
        BzModal.show("提示", "确定要执行此操作吗？", onConfirm = { BzToast.success("已确认") })
    }, block = true)
    BzButton(
        text = "ActionSheet",
        onClick = {
            BzActionSheet.show(
                title = "请选择",
                items = listOf(
                    BzActionSheetItem("分享") { BzToast.show("分享") },
                    BzActionSheetItem("删除", destructive = true) { BzToast.error("已删除") },
                ),
            )
        },
        block = true,
        bgColor = "gradient",
    )
}

@Composable
private fun ExtendedDemos() {
    var refreshing by remember { mutableStateOf(false) }
    var pickerVisible by remember { mutableStateOf(false) }
    var pickerIndex by remember { mutableIntStateOf(0) }
    var range by remember { mutableStateOf(20f..80f) }
    var color by remember { mutableStateOf(Color(0xFF5B6CFF)) }
    var uploads by remember { mutableIntStateOf(1) }
    val date = remember { LocalDate.now() }

    BzCustomNavPro(title = "增强导航", subtitle = "渐变 + 副标题", onBack = {})
    BzConfigProvider(theme = BreezeThemeVariant.Purple) {
        BzTag(text = "局部紫色主题", light = true)
    }
    BzWaterfallFlow(
        columns = 2,
        modifier = Modifier.height(180.dp),
        items = listOf(
            BzWaterfallItem("1", "卡片 A", 80, BreezeTheme.colors.primary),
            BzWaterfallItem("2", "卡片 B", 120, BreezeTheme.colors.secondary),
            BzWaterfallItem("3", "卡片 C", 100, Color(0xFF22D3EE)),
        ),
    )
    BzPullRefresh(refreshing = refreshing, onRefresh = { refreshing = true; refreshing = false }, modifier = Modifier.height(160.dp)) {
        LazyColumn {
            BzStickyHeader { androidx.compose.material3.Text("吸顶标题", fontWeight = androidx.compose.ui.text.font.FontWeight.Bold) }
            items(6) { androidx.compose.material3.Text("列表项 $it", Modifier.padding(12.dp)) }
        }
    }
    BzCalendar(selected = date, onSelect = {})
    BzButton(text = "打开 Picker：${listOf("北京", "上海", "深圳")[pickerIndex]}", onClick = { pickerVisible = true }, block = true)
    BzPicker(
        visible = pickerVisible,
        title = "选择城市",
        options = listOf("北京", "上海", "深圳"),
        selectedIndex = pickerIndex,
        onSelect = { pickerIndex = it },
        onDismiss = { pickerVisible = false },
    )
    BzDoubleSlider(range = range, onRangeChange = { range = it })
    BzColorPicker(selected = color, onSelected = { color = it })
    BzUpload(imageCount = uploads, maxCount = 3, onAddClick = { uploads++ })
    BzTimeline(
        entries = listOf(
            BzTimelineEntry("下单", "10:00", "用户提交订单"),
            BzTimelineEntry("发货", "14:20", "仓库已出库"),
        ),
    )
    BzTable(
        columns = listOf(
            BzTableColumn("name", "姓名", 1f),
            BzTableColumn("role", "角色", 1f),
        ),
        rows = listOf(mapOf("name" to "张三", "role" to "管理员"), mapOf("name" to "李四", "role" to "成员")),
    )
    BzTooltip(text = "提示说明") {
        BzTag(text = "点我看 Tooltip", onClick = {})
    }
}
