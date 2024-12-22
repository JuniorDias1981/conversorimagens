let imgElement = new Image();
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Exibe uma pré-visualização da imagem
document.getElementById("fileInput").addEventListener("change", function (event) {
    document.getElementById('loading').style.display = 'block'; // Exibe o carregando
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5000000) { // Limite de 5MB
            alert("O arquivo é muito grande! Tente um arquivo menor.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            imgElement.onload = function () {
                document.getElementById('loading').style.display = 'none'; // Oculta o carregando
                canvas.width = imgElement.width;
                canvas.height = imgElement.height;
                ctx.drawImage(imgElement, 0, 0);

                // Exibe a imagem carregada
                const preview = document.createElement('img');
                preview.src = e.target.result;
                preview.alt = "Pré-visualização da imagem";
                preview.style.maxWidth = '100%';
                preview.style.marginTop = '20px';
                document.querySelector('.container').appendChild(preview);
            };
            imgElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Redimensiona a imagem
document.getElementById("resizeBtn").addEventListener("click", function () {
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;

    if (!width || !height || width <= 0 || height <= 0) {
        alert("Por favor, insira valores válidos para a largura e altura.");
        return;
    }

    canvas.width = parseInt(width);
    canvas.height = parseInt(height);
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
});

// Baixar as imagens convertidas
document.getElementById("downloadPng").addEventListener("click", function () {
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "imagem_convertida.png";
    a.click();
});

document.getElementById("downloadJpg").addEventListener("click", function () {
    const dataUrl = canvas.toDataURL("image/jpeg");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "imagem_convertida.jpg";
    a.click();
});

document.getElementById("downloadIco").addEventListener("click", function () {
    const dataUrl = canvas.toDataURL("image/x-icon");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "imagem_convertida.ico";
    a.click();
});
