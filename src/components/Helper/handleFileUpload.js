export function handleFileUpload(setBuffer) {        
    const realBtn = document.querySelector('.real-btn');
    const customBtn = document.querySelector('.custom-button');
    const customText = document.querySelector('.custom-text');

    customBtn.addEventListener('click', () => realBtn.click());
    realBtn.addEventListener('change', e => {
        if(!realBtn.value) return customText.textContent = 'No file choosen yet!';

        const file = e.target.files[0];
        const fileType = file.type.split('/')[1];
        if(!fileType.match(/(jpeg|jpg|png)/)) return customText.textContent = 'Invalid file format!';
        
        // eslint-disable-next-line 
        // customText.textContent = realBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        customText.textContent = 'upload successful'

        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);

        reader.onloadend = () => setBuffer(Buffer(reader.result));
    });
}