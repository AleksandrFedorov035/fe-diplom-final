export default function LoadingProgress({ progress, isVisible }) {
    if (!isVisible) return null;

    return (
        <div className="loading-progress">
            <div className="progress-container">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="progress-content">
                    <p className="progress-text">идет поиск</p>
                    <iframe src="src/assets/images/animationTrain.gif" title="loading-fullscreen" />
                </div>
            </div>
        </div>
    );
}
