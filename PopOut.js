function PopOut() {
  const img = document.createElement('img');
  img.src = 'Added to Cart!';
  img.alt = 'Added to Cart!';
  img.style.position = 'fixed';
  img.style.top = '20px';
  img.style.right = '20px';
  img.style.width = '200px'; 
  img.style.zIndex = '1000';
  
  document.body.appendChild(img);

  setTimeout(() => {
    document.body.removeChild(img);
  }, 1500); // 1.5 seconds
}
