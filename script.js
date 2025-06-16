const form = document.getElementById('permitForm');
const display = document.getElementById('permitDisplay');
const qrCodeContainer = document.getElementById('qrcode');
let qr;

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const applicant = document.getElementById('applicant').value.trim();
  const docName = document.getElementById('docName').value.trim();
  const refNumber = document.getElementById('refNumber').value.trim();
  const status = document.getElementById('status').value;
  const validFrom = new Date(document.getElementById('validFrom').value);
  const validTo = new Date(document.getElementById('validTo').value);
  const cropName = document.getElementById('cropName').value.trim();

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const validFromStr = validFrom.toLocaleDateString('en-GB', options);
  const validToStr = validTo.toLocaleDateString('en-GB', options);

  display.innerHTML = `
    <p><span class="highlight">Applicant Name:</span> ${applicant}</p>
    <p><span class="highlight">Document Name:</span> ${docName}</p>
    <p><span class="highlight">Reference Number:</span> ${refNumber}</p>
    <p><span class="highlight">Current Status:</span> ${status}</p>
    <p><span class="highlight">Valid From:</span> ${validFromStr}</p>
    <p><span class="highlight">Valid To:</span> ${validToStr}</p>
    <p><span class="highlight">Crop/Product Name:</span> ${cropName || '(N/A)'}</p>
  `;
  display.style.display = 'inline-block';

  const params = new URLSearchParams({
    applicant,
    docName,
    refNumber,
    status,
    validFrom: validFrom.toISOString().slice(0,10),
    validTo: validTo.toISOString().slice(0,10),
    cropName
  });

  const verificationURL = \`\${window.location.origin}\${window.location.pathname.replace(/[^/]*$/, '')}verification.html?\${params.toString()}\`;

  qrCodeContainer.innerHTML = '';
  qr = new QRCode(qrCodeContainer, {
    text: verificationURL,
    width: 180,
    height: 180,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });

  qrCodeContainer.scrollIntoView({ behavior: 'smooth' });
});
