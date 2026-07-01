import {
    GithubIcon,
    Linkedin,
    Mail,
    MapPin
} from "lucide-react";
const sizeIcon = 19;
export default function Footer() {
    return (
        <footer>
            <div className="footer-inner">
                <div>
                    <p className="footer-name">Yoann Emmanuel</p>
                    <p className="footer-loc">
                        <MapPin size={sizeIcon} />

                        <span>Abidjan, Côte d'Ivoire</span>
                    </p>
                </div>

                <div className="footer-socials">
                    {/* Lien GitHub */}
                    <a
                        href="https://github.com/YOYOMANU"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >

                        <GithubIcon size={sizeIcon} />
                    </a>

                    {/* Lien LinkedIn */}
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={sizeIcon} />
                    </a>

                    {/* Lien Email direct */}
                    <a
                        href="mailto:contact@yoannemmanuel.dev"
                        aria-label="Email"
                    >
                        <Mail size={sizeIcon} />
                    </a>
                </div>

                <p className="footer-copy">© 2026 Yoann Emmanuel</p>
            </div>
        </footer>
    );
}