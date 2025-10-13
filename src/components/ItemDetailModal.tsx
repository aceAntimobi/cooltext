import type { Item } from '../data/library';

interface ItemDetailModalProps {
  item: Item;
  onClose: () => void;
  onCopy: (item: Item) => Promise<void>;
  isFavorite: boolean;
  onToggleFavorite: (item: Item) => void;
}

export function ItemDetailModal({ item, onClose, onCopy, isFavorite, onToggleFavorite }: ItemDetailModalProps) {
  const handleCopy = async () => {
    await onCopy(item);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close details">
          ✕
        </button>
        <div className="modal-character">{item.character}</div>
        <h2 className="modal-name">{item.name}</h2>
        {item.description && <p className="modal-description">{item.description}</p>}
        {item.keywords.length > 0 && (
          <div className="token-strip">
            {item.keywords.map((keyword) => (
              <span className="token" key={keyword}>
                #{keyword}
              </span>
            ))}
          </div>
        )}
        <div className="item-actions">
          <button type="button" className="action-button" onClick={handleCopy}>
            Copy
          </button>
          <button type="button" className="action-button secondary" onClick={() => onToggleFavorite(item)}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
}
