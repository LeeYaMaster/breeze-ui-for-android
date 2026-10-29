@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.breeze.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens
import com.breeze.ui.theme.bzClickable

/** 管理表行数据（`bz-admin-table` list 项）。 */
data class BzAdminTableRow(
    val id: String,
    val name: String,
    val cover: String? = null,
    val time: String? = null,
)

/** 管理表表头列（`bz-admin-table` header 项）。 */
data class BzAdminTableHeader(
    val name: String,
    val cover: String? = null,
    val time: String? = null,
)

enum class BzAdminTableAction { Show, Update, Del }

/**
 * 管理表格（`bz-admin-table`）：封面列 + 数据列 + 操作按钮。
 */
@Composable
fun BzAdminTable(
    list: List<BzAdminTableRow>,
    header: List<BzAdminTableHeader>,
    modifier: Modifier = Modifier,
    showCover: Boolean = true,
    showView: Boolean = false,
    showUpdate: Boolean = false,
    showDelete: Boolean = false,
    onAction: (id: String, action: BzAdminTableAction, row: BzAdminTableRow) -> Unit = { _, _, _ -> },
) {
    val shape = RoundedCornerShape(BreezeTheme.radius.md)
    Column(
        modifier
            .fillMaxWidth()
            .clip(shape)
            .background(BreezeTheme.colors.surface)
            .border(1.dp, BreezeTheme.colors.divider, shape),
    ) {
        header.forEach { col ->
            Row(
                Modifier
                    .fillMaxWidth()
                    .background(BreezeTheme.colors.light)
                    .padding(horizontal = 12.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                if (showCover) {
                    Text(
                        col.cover ?: "封面",
                        Modifier.weight(0.8f),
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 12.sp,
                    )
                }
                Text(col.name, Modifier.weight(1.2f), fontWeight = FontWeight.SemiBold, fontSize = 12.sp)
                if (col.time != null) {
                    Text(col.time, Modifier.weight(1f), fontWeight = FontWeight.SemiBold, fontSize = 12.sp)
                } else {
                    Text("时间", Modifier.weight(1f), fontWeight = FontWeight.SemiBold, fontSize = 12.sp)
                }
                Text("操作列表", Modifier.weight(1.4f), fontWeight = FontWeight.SemiBold, fontSize = 12.sp)
            }
            HorizontalDivider(color = BreezeTheme.colors.divider)
        }
        list.forEach { row ->
            Row(
                Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                if (showCover) {
                    Box(Modifier.weight(0.8f), contentAlignment = Alignment.CenterStart) {
                        BzAvatar(label = row.name.take(1), size = 40.dp)
                    }
                }
                Text(
                    row.name,
                    Modifier.weight(1.2f),
                    fontSize = 13.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
                Text(
                    row.time ?: "—",
                    Modifier.weight(1f),
                    fontSize = 12.sp,
                    color = BreezeTokens.Grey,
                )
                Row(
                    Modifier.weight(1.4f),
                    horizontalArrangement = Arrangement.spacedBy(4.dp),
                ) {
                    if (showView) {
                        BzButton(
                            text = "查看",
                            onClick = { onAction(row.id, BzAdminTableAction.Show, row) },
                            size = BzButtonSize.Sm,
                            bgColor = "olive",
                        )
                    }
                    if (showUpdate) {
                        BzButton(
                            text = "修改",
                            onClick = { onAction(row.id, BzAdminTableAction.Update, row) },
                            size = BzButtonSize.Sm,
                            bgColor = "cyan",
                        )
                    }
                    if (showDelete) {
                        BzButton(
                            text = "删除",
                            onClick = { onAction(row.id, BzAdminTableAction.Del, row) },
                            size = BzButtonSize.Sm,
                            bgColor = "red",
                        )
                    }
                }
            }
            HorizontalDivider(color = BreezeTheme.colors.divider)
        }
    }
}

/** 列表宫格项（`bz-list-grid` data 项）。 */
data class BzListGridItem(
    val name: String,
    val icon: ImageVector? = null,
    val colorName: String = "theme",
    val badge: Int = 0,
)

/**
 * 列表宫格（`bz-list-grid`）。
 */
@Composable
fun BzListGrid(
    data: List<BzListGridItem>,
    modifier: Modifier = Modifier,
    gridCol: Int = 3,
    gridBorder: Boolean = false,
    onItemClick: (BzListGridItem, index: Int) -> Unit = { _, _ -> },
) {
    val borderMod = if (gridBorder) {
        Modifier.border(1.dp, BreezeTheme.colors.divider, RoundedCornerShape(BreezeTheme.radius.md))
    } else {
        Modifier
    }
    Column(
        modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(BreezeTheme.radius.md))
            .then(borderMod)
            .background(BreezeTheme.colors.surface)
            .padding(8.dp),
    ) {
        data.chunked(gridCol).forEachIndexed { rowIndex, row ->
            Row(Modifier.fillMaxWidth()) {
                row.forEachIndexed { colIndex, item ->
                    val index = rowIndex * gridCol + colIndex
                    Column(
                        Modifier
                            .weight(1f)
                            .bzClickable { onItemClick(item, index) }
                            .padding(vertical = 12.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        Box(contentAlignment = Alignment.TopEnd) {
                            item.icon?.let { icon ->
                                BzIcon(
                                    icon,
                                    tint = BreezeTokens.namedColor(item.colorName) ?: BreezeTheme.colors.primary,
                                    modifier = Modifier.size(28.dp),
                                )
                            }
                            if (item.badge != 0) {
                                val label = when {
                                    item.badge == 1 -> ""
                                    item.badge > 99 -> "99+"
                                    else -> item.badge.toString()
                                }
                                Box(
                                    Modifier
                                        .size(if (label.isEmpty()) 8.dp else 18.dp)
                                        .clip(CircleShape)
                                        .background(BreezeTokens.Red),
                                    contentAlignment = Alignment.Center,
                                ) {
                                    if (label.isNotEmpty()) {
                                        Text(label, color = BreezeTokens.White, fontSize = 9.sp)
                                    }
                                }
                            }
                        }
                        Text(
                            item.name,
                            fontSize = 12.sp,
                            textAlign = TextAlign.Center,
                            modifier = Modifier.padding(top = 6.dp),
                        )
                    }
                }
                repeat(gridCol - row.size) { Box(Modifier.weight(1f)) }
            }
        }
    }
}

/** 与小程序 `loadmoreStatus` 对齐。 */
enum class BzListPageLoadMore { None, Loading, Over, Error, Custom }

/**
 * 根据 `bz-state-box` / `bz-list-page` 共用优先级解析视图状态。
 */
fun resolveBzListPageViewState(
    loading: Boolean = false,
    skeleton: Boolean = false,
    error: Any? = null,
    empty: Boolean = false,
    errorText: String = "加载失败，请稍后重试",
): Pair<BzStateBoxView, String> {
    if (loading) return BzStateBoxView.Loading to ""
    if (skeleton) return BzStateBoxView.Skeleton to ""
    if (error == true || (error is String && error.isNotEmpty())) {
        val msg = if (error is String && error.isNotEmpty()) error else errorText
        return BzStateBoxView.Error to msg
    }
    if (empty) return BzStateBoxView.Empty to ""
    return BzStateBoxView.Content to ""
}

/**
 * 列表页范式（`bz-list-page`）：下拉刷新 + 状态盒 + 页脚加载更多。
 */
@Composable
fun BzListPage(
    modifier: Modifier = Modifier,
    height: Dp = 360.dp,
    refresherEnabled: Boolean = true,
    refreshing: Boolean = false,
    onRefresh: () -> Unit = {},
    loading: Boolean = false,
    skeleton: Boolean = false,
    empty: Boolean = false,
    error: Any? = null,
    emptyText: String = "暂无数据",
    errorText: String = "加载失败，请稍后重试",
    loadingText: String? = null,
    onRetry: (() -> Unit)? = null,
    showLoadMore: Boolean = true,
    loadMore: BzListPageLoadMore = BzListPageLoadMore.None,
    loadMoreText: String? = null,
    onLoadMore: () -> Unit = {},
    content: @Composable () -> Unit,
) {
    val (viewState, resolvedError) = remember(loading, skeleton, error, empty, errorText) {
        resolveBzListPageViewState(loading, skeleton, error, empty, errorText)
    }
    val listState = rememberLazyListState()
    val shouldLoadMore by remember {
        derivedStateOf {
            val info = listState.layoutInfo
            val last = info.visibleItemsInfo.lastOrNull()?.index ?: 0
            last >= info.totalItemsCount - 2 && info.totalItemsCount > 0
        }
    }
    LaunchedEffect(shouldLoadMore, viewState, loadMore) {
        if (viewState == BzStateBoxView.Content && shouldLoadMore && loadMore != BzListPageLoadMore.Over) {
            onLoadMore()
        }
    }

    val body: @Composable () -> Unit = {
        LazyColumn(
            state = listState,
            modifier = Modifier
                .fillMaxWidth()
                .height(height),
        ) {
            item {
                BzStateBox(
                    state = viewState,
                    loadingText = loadingText,
                    errorMessage = resolvedError.ifEmpty { errorText },
                    emptyText = emptyText,
                    onRetry = onRetry,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(height - 48.dp),
                ) {
                    content()
                }
            }
            if (showLoadMore && viewState == BzStateBoxView.Content &&
                (loadMore != BzListPageLoadMore.None || !loadMoreText.isNullOrEmpty())
            ) {
                item {
                    BzListPageFooter(loadMore = loadMore, loadMoreText = loadMoreText, onRetry = onLoadMore)
                }
            }
        }
    }

    if (refresherEnabled) {
        BzPullRefresh(refreshing = refreshing, onRefresh = onRefresh, modifier = modifier) {
            body()
        }
    } else {
        Box(modifier) { body() }
    }
}

@Composable
private fun BzListPageFooter(
    loadMore: BzListPageLoadMore,
    loadMoreText: String?,
    onRetry: () -> Unit,
) {
    Box(
        Modifier
            .fillMaxWidth()
            .padding(vertical = 12.dp),
        contentAlignment = Alignment.Center,
    ) {
        when (loadMore) {
            BzListPageLoadMore.Loading -> BzLoadMore(status = BzLoadMoreStatus.Loading)
            BzListPageLoadMore.Over -> BzLoadMore(status = BzLoadMoreStatus.NoMore)
            BzListPageLoadMore.Error -> BzLoadMore(status = BzLoadMoreStatus.Error, onRetry = onRetry)
            BzListPageLoadMore.Custom -> loadMoreText?.let { Text(it, color = BreezeTokens.Grey, fontSize = 13.sp) }
            BzListPageLoadMore.None -> loadMoreText?.let { Text(it, color = BreezeTokens.Grey, fontSize = 13.sp) }
        }
    }
}
