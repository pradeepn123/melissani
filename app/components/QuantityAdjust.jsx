export function QuantityAdjust({quantity, setQuantity, minDisabled}) {
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  if (typeof minDisabled == "undefined") {
    minDisabled = quantity <= 1
  }
    
  return <div className="flex items-center border quantity-selector">
    <div>
      <button
        name="decrease-quantity"
        aria-label="Decrease quantity"
        className="w-10 h-6 transition text-black hover:text-primary disabled:text-primary/10"
        value={prevQuantity}
        disabled={minDisabled}
        onClick={() => setQuantity(prevQuantity)}
      >
        <span>&#8722;</span>
      </button>
    </div>

    <div className="px-2 text-center text-black" data-test="item-quantity">
      {quantity}
    </div>

    <div>
      <button
        className="w-10 h-6 transition text-black hover:text-primary"
        name="increase-quantity"
        value={nextQuantity}
        onClick={() => setQuantity(nextQuantity)}
        aria-label="Increase quantity"
      >
        <span>&#43;</span>
      </button>
    </div>
  </div>
}
