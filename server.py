import http.server
import mimetypes
import urllib.parse
import os

mimetypes.add_type('video/mp4', '.mp4')
mimetypes.add_type('video/webm', '.webm')

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Simular Netlify Image CDN en local:
        # /.netlify/images?url=/img/foto.jpg&w=800&fm=webp → sirve img/foto.jpg directamente
        if self.path.startswith('/.netlify/images'):
            parsed = urllib.parse.urlparse(self.path)
            params = urllib.parse.parse_qs(parsed.query)
            original = params.get('url', [None])[0]
            if original:
                self.path = original  # redirigir a la ruta real
        super().do_GET()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def log_message(self, format, *args):
        pass  # silenciar logs de cada request

if __name__ == '__main__':
    ip = '192.168.1.139'
    with http.server.HTTPServer(('', 8080), Handler) as httpd:
        print(f'\n  Escritorio → http://localhost:8080')
        print(f'  Móvil      → http://{ip}:8080\n')
        httpd.serve_forever()
