const fs = require('fs');
const path = require('path');

const targetUrl = 'https://wa.me/525538773469';

function processDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // processDirectory(fullPath); // Not needed for this project
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Pattern 1: aria-label="Contactar por WhatsApp" and href="#"
            const regex1 = /(<a[^>]*aria-label="[^"]*WhatsApp[^"]*"[^>]*href=")#[^"]*(")/gi;
            if (regex1.test(content)) {
                content = content.replace(regex1, `$1${targetUrl}$2 target="_blank" rel="noopener noreferrer"`);
                modified = true;
            }

            // Pattern 2: Whatsapp CTA text (e.g. RESERVA POR WHATSAPP)
            const regex2 = /(<a[^>]*href=")#[^"]*("[^>]*>\s*<span[^>]*>[^<]*<\/span>\s*[^<]*WHATSAPP)/gi;
            if (regex2.test(content)) {
                content = content.replace(regex2, `$1${targetUrl}$2`);
                modified = true;
            }

            // Pattern 3: Existing wa.me links
            const regex3 = /(href=")https:\/\/wa\.me\/[0-9]+(")/gi;
            if (regex3.test(content)) {
                content = content.replace(regex3, `$1${targetUrl}$2`);
                modified = true;
            }
            
            // Fix target blank if missing on new links
            const regex4 = /(<a[^>]*href="https:\/\/wa\.me\/525538773469"(?![^>]*target="_blank")[^>]*)>/gi;
            if (regex4.test(content)) {
                content = content.replace(regex4, `$1 target="_blank" rel="noopener noreferrer">`);
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
}

processDirectory('.');
