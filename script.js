document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const qrCodeDiv = document.getElementById('qr-code');
    const downloadBtn = document.getElementById('download-btn');
    const homeLink = document.querySelector('a[href="#home"]');
    const logoLink = document.querySelector('.logo-link');
    const aboutLink = document.querySelector('a[href="#about"]');
    const aboutModal = document.getElementById('about-modal');
    const closeModal = document.querySelector('.close-modal');

    let qrCode = null;

    // 홈 링크 클릭 시 새로고침
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.reload();
    });

    // 로고 클릭 시 새로고침
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.reload();
    });

    // 모달 열기
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        aboutModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // 모달 닫기
    closeModal.addEventListener('click', function() {
        aboutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(e) {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    generateBtn.addEventListener('click', generateQRCode);
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });

    function generateQRCode() {
        const text = textInput.value.trim();

        if (!text) {
            alert('텍스트를 입력해주세요.');
            return;
        }

        // 기존 QR 코드 제거
        qrCodeDiv.innerHTML = '';

        // 새로운 QR 코드 생성
        qrCode = new QRCode(qrCodeDiv, {
            text: text,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // QR 컨테이너 표시
        document.getElementById('qr-container').style.display = 'inline-block';

        // 다운로드 버튼 표시
        downloadBtn.style.display = 'inline-block';

        // 입력 필드 초기화
        textInput.value = '';
    }

    downloadBtn.addEventListener('click', function() {
        if (!qrCode) {
            alert('먼저 QR 코드를 생성해주세요.');
            return;
        }

        // QR 코드 이미지 가져오기
        const qrCanvas = qrCodeDiv.querySelector('canvas');
        if (qrCanvas) {
            // Canvas를 이미지로 변환
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = qrCanvas.toDataURL();
            link.click();
        }
    });
});