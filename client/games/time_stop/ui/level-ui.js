export function showLevelMissionUI(missionText, onClose) {
  const overlay = document.createElement('div');
  overlay.id = 'level-mission-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(50, 50, 50, 0.4)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '1000';
  overlay.style.cursor = 'pointer';

  const messageBox = document.createElement('div');
  messageBox.innerText = missionText;
  messageBox.style.backgroundColor = '#222';
  messageBox.style.color = 'white';
  messageBox.style.padding = '20px 30px';
  messageBox.style.borderRadius = '10px';
  messageBox.style.fontSize = '18px';
  messageBox.style.fontFamily = 'Arial, sans-serif';
  messageBox.style.textAlign = 'center';
  messageBox.style.maxWidth = '80vw';
  messageBox.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';

  const touchToStart = document.createElement('div');
  touchToStart.innerText = 'Touch to start';  
  Object.assign(touchToStart.style, {
    color: 'white',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
    marginTop: '28px',
    opacity: '0',
    transition: 'opacity 0.5s',
  });

  setTimeout(() => {
    touchToStart.style.opacity = '1';
  }, 1000);

  overlay.appendChild(messageBox);
  overlay.appendChild(touchToStart);
  document.body.appendChild(overlay);

  overlay.addEventListener('pointerup', () => {
    overlay.remove();
    if (onClose) onClose();
  });
}
