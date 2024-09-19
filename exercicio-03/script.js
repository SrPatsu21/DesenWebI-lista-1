document.getElementById('imageForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const errorMessage = document.getElementById('errorMessage');

    // Validação
    if (width < 100 || height < 100 || ![3, 5, 10, 20].includes(quantity)) {
        errorMessage.textContent = 'Por favor, insira valores válidos.';
        return;
    } else {
        errorMessage.textContent = '';
    }

    const imageGrid = document.getElementById('imageGrid');
    imageGrid.innerHTML = ''; // Limpa o grid antes de adicionar novas imagens

    for (let i = 0; i < quantity; i++) {

        const imageUrl = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Imagem aleatória';

        const downloadButton = document.createElement('a');
        downloadButton.href = `${imageUrl.replace(/\/\d+\/\d+/, '/1920/1080')}.webp`;
        downloadButton.download = 'imagem.webp';
        downloadButton.textContent = 'Baixar em Full HD';
        downloadButton.className = 'download-button';

        // Para garantir que o download funcione corretamente
        downloadButton.onclick = (e) => {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = downloadButton.href;
            link.download = 'imagem.webp';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const copyLinkButton = document.createElement('button');
        copyLinkButton.textContent = 'Copiar Link';
        copyLinkButton.onclick = () => {
            navigator.clipboard.writeText(imageUrl)
        };

        const shareWhatsAppLink = document.createElement('a');
        shareWhatsAppLink.href = `https://wa.me/?text=${encodeURIComponent(imageUrl)}`;
        shareWhatsAppLink.target = '_blank';
        shareWhatsAppLink.textContent = 'Compartilhar no WhatsApp';

        const shareEmail = document.createElement('a');
        shareEmail.href = `mailto:?subject=Confira%20esta%20imagem&body=Veja%20esta%20imagem:${encodeURIComponent(imageUrl)}`
        shareEmail.target = '_blank'
        shareEmail.textContent = 'Compartilhar com e-mail';

        imgContainer.appendChild(img);
        imgContainer.appendChild(copyLinkButton);
        imgContainer.appendChild(downloadButton);
        imgContainer.appendChild(shareWhatsAppLink);
        imgContainer.appendChild(shareEmail)
        imageGrid.appendChild(imgContainer);
    }
});
