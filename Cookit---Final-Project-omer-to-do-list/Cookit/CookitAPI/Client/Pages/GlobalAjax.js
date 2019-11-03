function GlobalAjax(url, type, details, success_callback, error_callback) {
    $.ajax({
        dataType: "json",
        url: url,
        contentType: "application/json; charset=utf-8",
        type: type,
        data: JSON.stringify(details),
        success: success_callback,
        error: error_callback
    });
}