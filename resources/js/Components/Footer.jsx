import { Link } from "@inertiajs/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 mt-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between items-center">
                    
                    {/* Logo et Copyright */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Voyage Buddy</h3>
                        <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                            © {new Date().getFullYear()} Tous droits réservés.
                        </p>
                    </div>

                    {/* Liens de navigation */}
                    <div className="flex space-x-6 mt-4 sm:mt-0">
                        <Link href={""} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                            Accueil
                        </Link>
                        <Link href={""} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                            À propos
                        </Link>
                        <Link href={""} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                            Contact
                        </Link>
                        <Link href={""} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                            Conditions
                        </Link>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="https://facebook.com" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-blue-500">
                            <FaFacebook size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-blue-400">
                            <FaTwitter size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-blue-600">
                            <FaLinkedin size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-pink-500">
                            <FaInstagram size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
