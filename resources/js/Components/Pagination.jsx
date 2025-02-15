import { Link } from "@inertiajs/react";

export default function Pagination({ Links = [] }) {
    if (!Links.length) return null; 
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination flex">
                {Links.map((link,index) => (
                   <li key={index} className="mx-1">
                   {link.url ? (
                     <Link
                     key={link.label}
                       href={link.url}
                       preserveScroll
                       className={`px-3 py-1 text-sm font-medium rounded-lg ${
                         link.active
                           ? "bg-blue-600 text-white"
                           : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                       }`}
                       dangerouslySetInnerHTML={{ __html: link.label }}
                     ></Link>
                   ) : (
                     // Bouton désactivé
                     <button
                       disabled
                       className="px-3 py-1 text-sm font-medium rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed"
                       dangerouslySetInnerHTML={{ __html: link.label }}
                     ></button>
                   )}
                 </li>
                ))}
            </ul>
        </nav>
    );
}
