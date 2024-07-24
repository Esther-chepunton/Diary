// app/layout.js
import Sidebar from './components/Sidebar'; // Ensure the path is correct
import './globals.css'; // Import global styles if you have any

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}