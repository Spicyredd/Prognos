export default function Footer() {
    return (
      <footer className="border-t border-white/10 bg-[#0c0c1c] py-10 px-6 text-center text-gray-400 text-sm">
        <div className="max-w-6xl mx-auto space-y-4">
          <p>
            Made with 💜 during a 2025 Hackathon | Built for the future of healthcare
          </p>
  
          <div className="flex flex-wrap justify-center gap-4 text-white/70 text-xs">
            <a href="#" className="hover:text-purple-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition">Terms of Use</a>
            <a href="#" className="hover:text-purple-400 transition">Contact</a>
          </div>
  
          <p className="text-white/30 mt-4">&copy; {new Date().getFullYear()} Diagnoso — All Rights Reserved</p>
        </div>
      </footer>
    );
  }
  