function Toast() {
    return (<>
        <div className="position-fixed bottom-0 end-0 m-3 card p-3 mt-5 w-25" >
            <div className="toast-alert" >
                <div className="toast-header">
                    <img src="..." className="rounded me-2" alt="..." />
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    Hello, world! This is a toast message.
                </div>
            </div>
        </div>
    </>
    );
}

export default Toast;