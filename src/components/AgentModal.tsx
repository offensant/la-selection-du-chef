import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink, Package, Truck } from 'lucide-react';
import { useState } from 'react';
import type { Product } from './ProductCard';
import { convertToAgentLink } from '../utils/linkConverter';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const AGENTS = [
  { id: 'acbuy', name: 'ACBuy' },
  { id: 'hippobuy', name: 'HippoBuy' },
  { id: 'cnfans', name: 'CNFans' },
  { id: 'superbuy', name: 'Superbuy' },
  { id: 'wegobuy', name: 'WeGoBuy' },
  { id: 'cssbuy', name: 'CSSBuy' },
  { id: 'sugargoo', name: 'Sugargoo' },
  { id: 'oopbuy', name: 'OopBuy' },
  { id: 'lovegobuy', name: 'LoveGoBuy' },
  { id: 'mulebuy', name: 'Mulebuy' },
  { id: 'litbuy', name: 'LitBuy' },
];

export default function AgentModal({ isOpen, onClose, product }: AgentModalProps) {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleCopyLink = () => {
    if (!product.url || product.url.includes('N/A')) return;
    navigator.clipboard.writeText(product.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-card"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-drag-handle" />
            <button className="modal-close" onClick={onClose}>
              <X size={16} />
            </button>

            {/* Product Preview */}
            <div className="modal-product-preview">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="modal-product-thumb"
                />
              )}
              <div className="modal-product-info">
                <h2 className="modal-title">{product.name}</h2>
                <span className="modal-price">{product.price}</span>
              </div>
            </div>

            {/* Meta strip */}
            <div className="modal-meta-strip">
              <span className="modal-meta-item">
                <Package className="modal-meta-icon" />
                ~800g estimé
              </span>
              <span className="modal-meta-item">
                <Truck className="modal-meta-icon" />
                ~15–25€ livraison
              </span>
            </div>

            <div className="modal-divider" />

            {/* Body */}
            <div className="modal-body">
              <button className="copy-btn" onClick={handleCopyLink}>
                <span>{copied ? '✓ Lien copié !' : 'Copier le lien original'}</span>
                <span className="copy-btn-icon">
                  {copied ? <Check /> : <Copy />}
                </span>
              </button>

              <div>
                <p className="agent-section-title">Choisir un agent d'achat</p>
                <div className="agent-grid">
                  {AGENTS.map((agent) => (
                    <a
                      key={agent.id}
                      href={convertToAgentLink(agent.id, product.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="agent-btn"
                      onClick={(e) => {
                        if (!product.url || product.url.includes('N/A')) {
                          e.preventDefault();
                          alert('Lien non disponible pour ce produit.');
                        }
                      }}
                    >
                      {agent.name}
                      <ExternalLink />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
