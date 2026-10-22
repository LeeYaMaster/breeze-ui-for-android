package com.breeze.ui.imperative

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import java.util.concurrent.atomic.AtomicReference

internal data class ToastRequest(
    val message: String,
    val icon: ToastIcon = ToastIcon.None,
    val durationMs: Long = 1500L,
)

enum class BzToastIcon { None, Success, Error, Loading }

internal enum class ToastIcon { None, Success, Error, Loading }

private fun BzToastIcon.toInternal() = when (this) {
    BzToastIcon.None -> ToastIcon.None
    BzToastIcon.Success -> ToastIcon.Success
    BzToastIcon.Error -> ToastIcon.Error
    BzToastIcon.Loading -> ToastIcon.Loading
}

internal data class ModalRequest(
    val title: String,
    val message: String,
    val showCancel: Boolean = true,
    val confirmText: String = "确定",
    val cancelText: String = "取消",
    val onConfirm: (() -> Unit)? = null,
    val onCancel: (() -> Unit)? = null,
)

data class BzActionSheetItem(
    val label: String,
    val destructive: Boolean = false,
    val onClick: () -> Unit,
)

internal data class ActionSheetRequest(
    val title: String? = null,
    val items: List<BzActionSheetItem>,
    val cancelText: String = "取消",
)

internal data class ToastTopRequest(
    val message: String,
    val success: Boolean = true,
    val durationMs: Long = 2000L,
)

internal class BzOverlayState {
    var toast by mutableStateOf<ToastRequest?>(null)
    var toastTop by mutableStateOf<ToastTopRequest?>(null)
    var modal by mutableStateOf<ModalRequest?>(null)
    var actionSheet by mutableStateOf<ActionSheetRequest?>(null)
}

internal object BzOverlayRegistry {
    private val ref = AtomicReference<BzOverlayState?>(null)

    fun attach(state: BzOverlayState) {
        ref.set(state)
    }

    fun detach(state: BzOverlayState) {
        if (ref.get() === state) ref.set(null)
    }

    fun state(): BzOverlayState? = ref.get()
}

/**
 * 居中 Toast 命令式 API（对应 mini-program `utils/toast.js`）。
 */
object BzToast {
    fun show(
        message: String,
        durationMs: Long = 1500L,
        icon: BzToastIcon = BzToastIcon.None,
    ) {
        BzOverlayRegistry.state()?.toast = ToastRequest(message, icon.toInternal(), durationMs)
    }

    fun success(message: String, durationMs: Long = 1500L) =
        show(message, durationMs, BzToastIcon.Success)

    fun error(message: String, durationMs: Long = 1500L) =
        show(message, durationMs, BzToastIcon.Error)

    fun loading(message: String = "加载中…") =
        show(message, durationMs = 60_000L, icon = BzToastIcon.Loading)

    fun hide() {
        BzOverlayRegistry.state()?.toast = null
    }
}

/** 顶部 Toast（`bz-toast-top` / `utils/toast.js` top）。 */
object BzToastTop {
    fun show(message: String, success: Boolean = true, durationMs: Long = 2000L) {
        BzOverlayRegistry.state()?.toastTop = ToastTopRequest(message, success, durationMs)
    }

    fun hide() {
        BzOverlayRegistry.state()?.toastTop = null
    }
}

/**
 * 模态框命令式 API。
 */
object BzModal {
    fun show(
        title: String,
        message: String,
        showCancel: Boolean = true,
        confirmText: String = "确定",
        cancelText: String = "取消",
        onConfirm: (() -> Unit)? = null,
        onCancel: (() -> Unit)? = null,
    ) {
        BzOverlayRegistry.state()?.modal = ModalRequest(
            title, message, showCancel, confirmText, cancelText, onConfirm, onCancel,
        )
    }

    fun hide() {
        BzOverlayRegistry.state()?.modal = null
    }
}

/**
 * 底部操作菜单命令式 API。
 */
object BzActionSheet {
    fun show(
        title: String? = null,
        items: List<BzActionSheetItem>,
        cancelText: String = "取消",
    ) {
        BzOverlayRegistry.state()?.actionSheet = ActionSheetRequest(title, items, cancelText)
    }

    fun hide() {
        BzOverlayRegistry.state()?.actionSheet = null
    }
}
