import React, { useState, useEffect } from 'react';
import {
  Phone, Mail, MapPin, Search, ArrowRight, CheckCircle2,
  X, MessageSquare, ShoppingBag, Menu as MenuIcon,
  Plus, Minus, Trash2, Heart, User, ChevronRight,
  ChevronDown, Package, Star, Globe, Sparkles, ShieldCheck, Award
} from 'lucide-react';
import { categories, products } from './data/products';
import { siteConfig } from './data/siteConfig';
import logoImg from './images/golden-moment-logo.svg';
import heroBg from './images/hero-golden-moment.webp';
import brandBottleImg from './images/bottle-golden-moment.webp';
import bannerScentImg from './images/banner-elegance-scent.webp';
import catBodyOilsImg from './images/cat-body-oils.webp';
import catJournalsImg from './images/cat-journals.webp';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'shop' | 'about' | 'faq' | 'contact' | 'product-detail'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currency, setCurrency] = useState('EUR'); // 'EUR' | 'USD'
  const [modalType, setModalType] = useState(null); // 'concierge' | 'quote' | 'checkout' | null
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Carousel & FAQ state
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Cart, Wishlist & Product Detail state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('golden_moment_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('golden_moment_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[4]); // Default to Fatal Rose
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [activeDetailTab, setActiveDetailTab] = useState('description');
  const [toastMessage, setToastMessage] = useState(null);

  const scentSlides = [
    {
      titleTop: 'THE',
      titleMain: 'ELEGANCE',
      titleBottom: 'OF SCENT',
      subtitle: 'GET THE FULL COLLECTION OF GOLDEN MOMENT BODY OILS IN ONE LUXURIOUS PACKAGE.',
      image: bannerScentImg,
      actionProductId: 4
    },
    {
      titleTop: 'RARE',
      titleMain: 'AFRICAN',
      titleBottom: 'SHEA NECTAR',
      subtitle: 'COLD-WHIPPED GRADE-A SHEA BUTTERS THAT MELT ON CONTACT FOR 24-HOUR VELVET RADIANCE.',
      image: catBodyOilsImg,
      actionCategory: 'shea-butters'
    },
    {
      titleTop: 'SLOW',
      titleMain: 'MINDFUL',
      titleBottom: 'RITUALS',
      subtitle: 'PAIR OUR BOTANICAL OILS WITH LINEN-BOUND JOURNALS FOR EVENING STILLNESS AND GLOW.',
      image: catJournalsImg,
      actionCategory: 'journals'
    }
  ];

  // Currency formatter
  const formatPrice = (eurAmount) => {
    if (currency === 'USD') {
      const usd = (eurAmount * 1.09).toFixed(2);
      return `$${usd}`;
    }
    return `€${Number(eurAmount).toFixed(2)}`;
  };

  // Document title & favicon
  useEffect(() => {
    document.title = `${siteConfig.companyName} | ${siteConfig.tagline}`;
    const faviconLink = document.querySelector("link[rel*='icon']");
    if (faviconLink && siteConfig.logo) {
      faviconLink.href = siteConfig.logo;
    }
  }, []);

  // Persist cart & wishlist
  useEffect(() => {
    try {
      localStorage.setItem('golden_moment_cart', JSON.stringify(cart));
    } catch {
      // ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('golden_moment_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Body scroll lock & Escape handler
  useEffect(() => {
    const isOverlayOpen = mobileMenuOpen || cartOpen || Boolean(modalType);
    document.body.style.overflow = isOverlayOpen ? 'hidden' : '';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setCartOpen(false);
        closeModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen, cartOpen, modalType]);

  // Auto-advance bottom scent carousel gently
  useEffect(() => {
    if (activeTab !== 'home') return undefined;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % scentSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [activeTab]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const navigateTo = (tabName, categoryFilter = null) => {
    if (categoryFilter !== null) {
      setSelectedCategory(categoryFilter);
    }
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    setFormSubmitted(false);
    setContactSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (product, e) => {
    if (e) e.stopPropagation();
    const exists = wishlist.includes(product.id);
    setWishlist((prev) =>
      exists ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
    showToast(exists ? `Removed ${product.name} from saved items` : `Saved ${product.name} to wishlist`);
  };

  const addToCart = (product, qty = 1, openDrawer = true) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`Added ${qty}× ${product.shortTitle || product.name} to your bag`);
    if (openDrawer) setCartOpen(true);
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.priceNumeric * item.quantity,
    0
  );

  const viewProductDetail = (product) => {
    setActiveProduct(product);
    setDetailQuantity(1);
    setActiveDetailTab('description');
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    setFormSubmitted(true);
    setTimeout(() => {
      if (modalType === 'checkout') {
        clearCart();
      }
      if (modalType) closeModal();
    }, 2200);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 4500);
  };

  const filteredProducts = products
    .filter((item) => {
      if (selectedCategory === 'wishlist') {
        return wishlist.includes(item.id);
      }
      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'price-high') return b.priceNumeric - a.priceNumeric;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });

  const homeShowcaseProducts = products.filter((p) => p.showOnHome).slice(0, 8);

  const renderFaqSection = (isStandalone = false) => {
    const HeadingTag = isStandalone ? 'h1' : 'h2';
    return (
      <section
        id={isStandalone ? undefined : 'home-faqs'}
        className={isStandalone ? 'gm-subpage' : 'gm-home-faq-section'}
      >
        <div className="gm-subpage-inner gm-faq-container">
          <div className="gm-subpage-head">
            <span className="gm-kicker">ATELIER CARE GUIDE</span>
            <HeadingTag className="gm-subpage-title">Frequently Asked Questions</HeadingTag>
            <p className="gm-subpage-lead">
              Everything you need to know about our Extrait de Parfum body oils, unrefined African shea butters, and global shipping.
            </p>
          </div>

          <div className="gm-faq-list">
            {siteConfig.faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className={`gm-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="gm-faq-q"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={18} className="gm-faq-chevron" />
                  </button>
                  {isOpen && <p className="gm-faq-a">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  const renderContactSection = (isStandalone = false) => {
    const HeadingTag = isStandalone ? 'h1' : 'h2';
    return (
      <section
        id={isStandalone ? undefined : 'home-contact'}
        className={isStandalone ? 'gm-subpage' : 'gm-home-contact-section'}
      >
        <div className="gm-subpage-inner">
          <div className="gm-subpage-head">
            <span className="gm-kicker">{siteConfig.contact.sectionTag}</span>
            <HeadingTag className="gm-subpage-title">Contact {siteConfig.companyName}</HeadingTag>
            <p className="gm-subpage-lead">{siteConfig.contact.tagline}</p>
          </div>

          <div className="gm-contact-grid">
            <div className="gm-contact-card-dark">
              <h3>{siteConfig.contact.cardTitle}</h3>
              <div className="gm-contact-rows">
                <div>
                  <Mail size={18} color="#c5a24d" />
                  <div>
                    <small>{siteConfig.contact.labels.email}</small>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </div>
                </div>
                <div>
                  <Phone size={18} color="#c5a24d" />
                  <div>
                    <small>{siteConfig.contact.labels.phone}</small>
                    <a href={`tel:${siteConfig.phoneDirectTel}`}>{siteConfig.phoneDirect}</a>
                  </div>
                </div>
                <div>
                  <MessageSquare size={18} color="#c5a24d" />
                  <div>
                    <small>{siteConfig.contact.labels.whatsapp}</small>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Chat on WhatsApp ({siteConfig.whatsappDisplay}) →
                    </a>
                  </div>
                </div>
                <div>
                  <MapPin size={18} color="#c5a24d" />
                  <div>
                    <small>{siteConfig.contact.labels.hub}</small>
                    <span>{siteConfig.address.full}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="gm-contact-form-card">
              <h3>{siteConfig.contact.formTitle}</h3>
              <form onSubmit={handleContactSubmit} className="gm-form">
                <div className="gm-form-group">
                  <label>Full Name *</label>
                  <input type="text" required placeholder="Your name" />
                </div>
                <div className="gm-form-group">
                  <label>Email Address *</label>
                  <input type="email" required placeholder="you@example.com" />
                </div>
                <div className="gm-form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Scent Consultation / Boutique Order" />
                </div>
                <div className="gm-form-group">
                  <label>Message *</label>
                  <textarea rows={4} required placeholder="How may our atelier assist you?" />
                </div>
                <button type="submit" className="gm-btn-gold">
                  Send Message
                </button>
              </form>
              {contactSubmitted && (
                <div className="gm-success-note">
                  {siteConfig.contact.formSuccess}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="gm-app-shell">
      {/* LUXURY EDITORIAL TWO-TIER HEADER */}
      <header className="gm-header">
        {/* Top Utility & Centered Brand Wordmark Row */}
        <div className="gm-header-top">
          <div className="gm-header-left">
            <button
              type="button"
              className="gm-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={20} />
            </button>
            <button
              type="button"
              className="gm-lang-btn"
              onClick={() => setCurrency((c) => (c === 'EUR' ? 'USD' : 'EUR'))}
              title="Switch currency"
            >
              <span>EN</span>
              <span className="gm-dot-sep">·</span>
              <span>{currency}</span>
              <ChevronDown size={12} />
            </button>
          </div>

          <button
            type="button"
            className="gm-brand-wordmark"
            onClick={() => navigateTo('home')}
          >
            <span className="gm-word-thin">GOLDEN</span>
            <span className="gm-word-gold">MOMENT</span>
          </button>

          <div className="gm-header-actions">
            <button
              type="button"
              className="gm-icon-btn"
              onClick={() => setModalType('concierge')}
              aria-label="Atelier Concierge"
              title="Atelier Concierge"
            >
              <User size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="gm-icon-btn"
              onClick={() => navigateTo('shop', 'wishlist')}
              aria-label="Wishlist"
              title="Saved Wishlist"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="gm-badge-dot">{wishlist.length}</span>
              )}
            </button>
            <button
              type="button"
              className="gm-icon-btn"
              onClick={() => setCartOpen(true)}
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="gm-bag-count">{totalCartItems}</span>
            </button>
          </div>
        </div>

        {/* Centered Navigation Row */}
        <nav className="gm-nav-row" aria-label="Primary Navigation">
          <ul className="gm-nav-list">
            <li>
              <button
                type="button"
                className={`gm-nav-link ${activeTab === 'home' ? 'is-active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                HOME
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`gm-nav-link ${activeTab === 'shop' ? 'is-active' : ''}`}
                onClick={() => navigateTo('shop', 'all')}
              >
                SHOP
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`gm-nav-link ${activeTab === 'about' ? 'is-active' : ''}`}
                onClick={() => navigateTo('about')}
              >
                ABOUT US
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`gm-nav-link ${activeTab === 'faq' ? 'is-active' : ''}`}
                onClick={() => navigateTo('faq')}
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`gm-nav-link ${activeTab === 'contact' ? 'is-active' : ''}`}
                onClick={() => navigateTo('contact')}
              >
                CONTACT
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div
          className="gm-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="gm-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gm-mobile-drawer-head">
              <div className="gm-brand-wordmark gm-brand-sm">
                <span className="gm-word-thin">GOLDEN</span>
                <span className="gm-word-gold">MOMENT</span>
              </div>
              <button
                type="button"
                className="gm-icon-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="gm-mobile-links">
              <button onClick={() => navigateTo('home')}>Home</button>
              <button onClick={() => navigateTo('shop', 'all')}>Shop All ({products.length})</button>
              <button onClick={() => navigateTo('shop', 'body-oils')}>Body Oils</button>
              <button onClick={() => navigateTo('shop', 'shea-butters')}>Body Shea Butters</button>
              <button onClick={() => navigateTo('shop', 'journals')}>Journals</button>
              <button onClick={() => navigateTo('about')}>About Us</button>
              <button onClick={() => navigateTo('faq')}>FAQ</button>
              <button onClick={() => navigateTo('contact')}>Contact</button>
            </div>

            <div className="gm-mobile-footer">
              <button
                type="button"
                className="gm-btn-gold"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCartOpen(true);
                }}
              >
                Shopping Bag ({totalCartItems})
              </button>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="gm-mobile-wa"
              >
                <MessageSquare size={15} />
                <span>WhatsApp Concierge: {siteConfig.phoneDirect}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          VIEW 1: HOME PAGE (MATCHING REFERENCE SCREENSHOT)
         ================================================================= */}
      {activeTab === 'home' && (
        <main>
          {/* 1. FULL-BLEED EDITORIAL HERO BANNER */}
          <section className="gm-hero-section">
            <img
              src={heroBg}
              alt="GOLDEN MOMENT — Luxury Rooted in Nature"
              className="gm-hero-img"
              fetchPriority="high"
            />
            <div className="gm-hero-scrim" aria-hidden="true" />
            <div className="gm-hero-content">
              <h1 className="gm-hero-title">
                <span className="gm-hero-light">LUXURY</span>
                <br />
                <span className="gm-hero-light">ROOTED IN </span>
                <span className="gm-hero-strong">NATURE</span>
              </h1>
              <p className="gm-hero-subtitle">
                {siteConfig.heroSubtitle}
              </p>
              <div className="gm-hero-cta-row">
                <button
                  type="button"
                  className="gm-hero-shop-link"
                  onClick={() => navigateTo('shop', 'all')}
                >
                  <span>EXPLORE COLLECTION</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </section>

          {/* 2. ANTIQUE GOLD MARQUEE STRIP */}
          <div className="gm-gold-ticker" aria-label="GOLDEN MOMENT Highlights">
            <div className="gm-ticker-track">
              {[0, 1].map((dup) => (
                <div key={dup} className="gm-ticker-group" aria-hidden={dup === 1}>
                  <button
                    type="button"
                    className="gm-ticker-btn"
                    onClick={() => navigateTo('shop', 'body-oils')}
                  >
                    SHOP BODY OILS
                  </button>
                  <span className="gm-ticker-star">✦</span>
                  <button
                    type="button"
                    className="gm-ticker-btn"
                    onClick={() => navigateTo('shop', 'shea-butters')}
                  >
                    SHOP SHEA BUTTER
                  </button>
                  <span className="gm-ticker-star">✦</span>
                  <button
                    type="button"
                    className="gm-ticker-btn"
                    onClick={() => navigateTo('shop', 'journals')}
                  >
                    SHOP JOURNALS
                  </button>
                  <span className="gm-ticker-star">✦</span>
                  <button
                    type="button"
                    className="gm-ticker-btn"
                    onClick={() => navigateTo('about')}
                  >
                    ETHICAL &amp; SUSTAINABLE
                  </button>
                  <span className="gm-ticker-star">✦</span>
                  <button
                    type="button"
                    className="gm-ticker-btn"
                    onClick={() => navigateTo('shop', 'body-oils')}
                  >
                    SHOP BODY OILS
                  </button>
                  <span className="gm-ticker-star">✦</span>
                  <button
                    type="button"
                    className="gm-ticker-btn"
                    onClick={() => navigateTo('shop', 'shea-butters')}
                  >
                    SHOP SHEA BUTTER
                  </button>
                  <span className="gm-ticker-star">✦</span>
                  <button
                    type="button"
                    className="gm-ticker-btn"
                    onClick={() => navigateTo('shop', 'journals')}
                  >
                    SHOP JOURNALS
                  </button>
                  <span className="gm-ticker-star">✦</span>
                  <button
                    type="button"
                    className="gm-ticker-btn"
                    onClick={() => navigateTo('about')}
                  >
                    ETHICAL &amp; SUSTAINABLE
                  </button>
                  <span className="gm-ticker-star">✦</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. BRAND STORY SPLIT SECTION (WATERMARK + FLOATING BOTTLE) */}
          <section className="gm-brand-intro-section">
            <div className="gm-brand-watermark" aria-hidden="true">
              GOLDEN
            </div>
            <div className="gm-brand-intro-inner">
              <div className="gm-brand-bottle-col">
                <img
                  src={brandBottleImg}
                  alt="GOLDEN MOMENT Body Oil Luxury Bottle"
                  className="gm-brand-bottle-img"
                  loading="lazy"
                />
              </div>

              <div className="gm-brand-copy-col">
                <h2 className="gm-brand-heading">
                  <span className="gm-head-thin">GOLDEN</span>
                  <span className="gm-head-gold">MOMENT</span>
                </h2>
                <p className="gm-brand-desc">
                  {siteConfig.brandIntroCopy}
                </p>
                <button
                  type="button"
                  className="gm-learn-more-link"
                  onClick={() => navigateTo('about')}
                >
                  L E A R N &nbsp; M O R E
                </button>
              </div>
            </div>
          </section>

          {/* 4. THREE-COLUMN EDITORIAL CATEGORY SHOWCASE */}
          <section className="gm-category-trio" aria-label="Product Categories">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="gm-cat-card"
                onClick={() => navigateTo('shop', cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigateTo('shop', cat.id);
                  }
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="gm-cat-img"
                  loading="lazy"
                />
                <div className="gm-cat-scrim" aria-hidden="true" />
                <div className="gm-cat-overlay">
                  <h3>{cat.name}</h3>
                  <span className="gm-cat-shop-link">
                    {cat.buttonText} <ChevronRight size={11} />
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* 5. EIGHT-PRODUCT LUXURY COLLECTION GRID (4 x 2) */}
          <section id="featured-products-section" className="gm-collection-section">
            <div className="gm-collection-container">
              <div className="gm-product-grid-4">
                {homeShowcaseProducts.map((prod) => {
                  const isWished = wishlist.includes(prod.id);
                  return (
                    <article
                      key={prod.id}
                      className="gm-prod-card"
                      onClick={() => viewProductDetail(prod)}
                    >
                      <div className="gm-prod-media-box">
                        {prod.badge && (
                          <span className="gm-prod-badge">{prod.badge}</span>
                        )}
                        <button
                          type="button"
                          className={`gm-wish-btn ${isWished ? 'is-wished' : ''}`}
                          onClick={(e) => toggleWishlist(prod, e)}
                          aria-label={isWished ? 'Remove from wishlist' : 'Save to wishlist'}
                        >
                          <Heart
                            size={14}
                            fill={isWished ? '#9b7a2c' : 'none'}
                            color={isWished ? '#9b7a2c' : '#57534e'}
                          />
                        </button>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="gm-prod-img"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          className="gm-quick-add-bar"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(prod, 1, true);
                          }}
                        >
                          ADD TO BAG
                        </button>
                      </div>

                      <div className="gm-prod-meta">
                        <div className="gm-prod-brand">{prod.brand}</div>
                        <h3 className="gm-prod-title">{prod.shortTitle}</h3>
                        <div className="gm-prod-price">{formatPrice(prod.priceNumeric)}</div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="gm-view-all-wrap">
                <button
                  type="button"
                  className="gm-outline-btn"
                  onClick={() => navigateTo('shop', 'all')}
                >
                  VIEW FULL ATELIER CATALOG ({products.length})
                </button>
              </div>
            </div>
          </section>

          {/* 6. BOTTOM EDITORIAL CAROUSEL ("THE ELEGANCE OF SCENT") */}
          <section className="gm-scent-carousel" aria-label="The Elegance of Scent">
            <img
              src={scentSlides[activeSlide].image}
              alt={`${scentSlides[activeSlide].titleTop} ${scentSlides[activeSlide].titleMain}`}
              className="gm-carousel-bg"
              loading="lazy"
            />
            <div className="gm-carousel-scrim" aria-hidden="true" />

            <div className="gm-carousel-dots">
              {scentSlides.map((slide, idx) => (
                <button
                  key={slide.titleMain}
                  type="button"
                  className={`gm-carousel-dot ${activeSlide === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div
              className="gm-carousel-copy"
              onClick={() => {
                const s = scentSlides[activeSlide];
                if (s.actionProductId) {
                  const found = products.find((p) => p.id === s.actionProductId);
                  if (found) {
                    viewProductDetail(found);
                    return;
                  }
                }
                navigateTo('shop', s.actionCategory || 'all');
              }}
            >
              <div className="gm-carousel-heading">
                <span className="gm-carousel-thin">{scentSlides[activeSlide].titleTop}</span>
                <br />
                <span>{scentSlides[activeSlide].titleMain}</span>
                <br />
                <span>{scentSlides[activeSlide].titleBottom}</span>
              </div>
              <p className="gm-carousel-sub">
                {scentSlides[activeSlide].subtitle}
              </p>
            </div>
          </section>

          {/* 7. FREQUENTLY ASKED QUESTIONS (HOME SECTION) */}
          {renderFaqSection(false)}

          {/* 8. ATELIER CONTACT & CONCIERGE (HOME SECTION) */}
          {renderContactSection(false)}
        </main>
      )}

      {/* =================================================================
          VIEW 2: SHOP ALL CATALOG
         ================================================================= */}
      {activeTab === 'shop' && (
        <section className="gm-subpage">
          <div className="gm-subpage-inner">
            <div className="gm-subpage-head">
              <span className="gm-kicker">GOLDEN MOMENT COLLECTION</span>
              <h1 className="gm-subpage-title">Shop All Formulations</h1>
              <p className="gm-subpage-lead">
                Explore perfume-inspired body oils, cold-whipped African shea butters, discovery sets, and mindful self-care journals.
              </p>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="gm-shop-toolbar">
              <div className="gm-filter-pills">
                <button
                  type="button"
                  className={`gm-pill-btn ${selectedCategory === 'all' ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All ({products.length})
                </button>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`gm-pill-btn ${selectedCategory === cat.id ? 'is-active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.title} ({count})
                    </button>
                  );
                })}
                <button
                  type="button"
                  className={`gm-pill-btn ${selectedCategory === 'wishlist' ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory('wishlist')}
                >
                  Wishlist ({wishlist.length})
                </button>
              </div>

              <div className="gm-toolbar-right">
                <div className="gm-search-box">
                  <Search size={15} color="#78716c" />
                  <input
                    type="text"
                    placeholder="Search scents, shea, SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="gm-sort-select"
                  aria-label="Sort products"
                >
                  <option value="default">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="gm-empty-state">
                <Package size={40} strokeWidth={1.3} color="#9b7a2c" />
                <h3>No formulations found</h3>
                <p>Try clearing your filters or searching for another scent note.</p>
                <button
                  type="button"
                  className="gm-btn-gold"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="gm-product-grid-4">
                {filteredProducts.map((prod) => {
                  const isWished = wishlist.includes(prod.id);
                  return (
                    <article
                      key={prod.id}
                      className="gm-prod-card"
                      onClick={() => viewProductDetail(prod)}
                    >
                      <div className="gm-prod-media-box">
                        {prod.badge && (
                          <span className="gm-prod-badge">{prod.badge}</span>
                        )}
                        <button
                          type="button"
                          className={`gm-wish-btn ${isWished ? 'is-wished' : ''}`}
                          onClick={(e) => toggleWishlist(prod, e)}
                          aria-label="Wishlist"
                        >
                          <Heart
                            size={14}
                            fill={isWished ? '#9b7a2c' : 'none'}
                            color={isWished ? '#9b7a2c' : '#57534e'}
                          />
                        </button>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="gm-prod-img"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          className="gm-quick-add-bar"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(prod, 1, true);
                          }}
                        >
                          ADD TO BAG
                        </button>
                      </div>

                      <div className="gm-prod-meta">
                        <div className="gm-prod-brand">{prod.brand}</div>
                        <h3 className="gm-prod-title">{prod.shortTitle}</h3>
                        <div className="gm-prod-price">{formatPrice(prod.priceNumeric)}</div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =================================================================
          VIEW 3: PRODUCT DETAIL PAGE
         ================================================================= */}
      {activeTab === 'product-detail' && activeProduct && (
        <section className="gm-subpage">
          <div className="gm-subpage-inner">
            <button
              type="button"
              className="gm-back-link"
              onClick={() => navigateTo('shop')}
            >
              ← Back to Collection
            </button>

            <div className="gm-detail-grid">
              <div className="gm-detail-media">
                {activeProduct.badge && (
                  <span className="gm-prod-badge">{activeProduct.badge}</span>
                )}
                <img src={activeProduct.image} alt={activeProduct.name} />
              </div>

              <div className="gm-detail-info">
                <div className="gm-kicker">
                  {activeProduct.categoryName} · {activeProduct.sku}
                </div>
                <h1 className="gm-detail-title">{activeProduct.name}</h1>

                <div className="gm-detail-rating">
                  <div className="gm-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#9b7a2c" color="#9b7a2c" />
                    ))}
                  </div>
                  <span>
                    {activeProduct.rating.toFixed(1)} ({activeProduct.reviewCount} reviews)
                  </span>
                </div>

                <div className="gm-detail-price-row">
                  <span className="gm-detail-price">
                    {formatPrice(activeProduct.priceNumeric)}
                  </span>
                  <span className="gm-detail-pack">{activeProduct.packSize}</span>
                </div>

                <p className="gm-detail-desc">{activeProduct.description}</p>

                <div className="gm-detail-actions">
                  <div className="gm-qty-box">
                    <button
                      type="button"
                      onClick={() => setDetailQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{detailQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setDetailQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="gm-btn-gold gm-btn-grow"
                    onClick={() => addToCart(activeProduct, detailQuantity, true)}
                  >
                    ADD TO BAG — {formatPrice(activeProduct.priceNumeric * detailQuantity)}
                  </button>

                  <button
                    type="button"
                    className="gm-btn-outline-sq"
                    onClick={(e) => toggleWishlist(activeProduct, e)}
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      size={17}
                      fill={wishlist.includes(activeProduct.id) ? '#9b7a2c' : 'none'}
                      color="#9b7a2c"
                    />
                  </button>
                </div>

                <button
                  type="button"
                  className="gm-btn-stockist"
                  onClick={() => {
                    setSelectedProduct(activeProduct);
                    setModalType('quote');
                  }}
                >
                  Request Spa / Boutique Stockist Quote
                </button>

                {/* Detail Tabs */}
                <div className="gm-detail-tabs">
                  <button
                    type="button"
                    className={activeDetailTab === 'description' ? 'is-active' : ''}
                    onClick={() => setActiveDetailTab('description')}
                  >
                    Formulation &amp; Notes
                  </button>
                  <button
                    type="button"
                    className={activeDetailTab === 'specs' ? 'is-active' : ''}
                    onClick={() => setActiveDetailTab('specs')}
                  >
                    Specifications
                  </button>
                  <button
                    type="button"
                    className={activeDetailTab === 'tiers' ? 'is-active' : ''}
                    onClick={() => setActiveDetailTab('tiers')}
                  >
                    Boutique Tiers
                  </button>
                </div>

                <div className="gm-detail-tab-panel">
                  {activeDetailTab === 'description' && (
                    <>
                      <p>{activeProduct.longDescription}</p>
                      <ul className="gm-feature-list">
                        {activeProduct.features.map((f) => (
                          <li key={f}>
                            <CheckCircle2 size={15} color="#9b7a2c" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {activeDetailTab === 'specs' && (
                    <div className="gm-specs-list">
                      {activeProduct.specs.map((s) => (
                        <div key={s.label} className="gm-spec-row">
                          <span>{s.label}</span>
                          <strong>{s.value}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeDetailTab === 'tiers' && (
                    <div className="gm-specs-list">
                      {activeProduct.tiers.map((t) => (
                        <div key={t.range} className="gm-spec-row">
                          <span>{t.range}</span>
                          <strong>
                            {t.price} · {t.discount}
                          </strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =================================================================
          VIEW 4: ABOUT US
         ================================================================= */}
      {activeTab === 'about' && (
        <section className="gm-subpage">
          <div className="gm-subpage-inner">
            <div className="gm-about-split">
              <div className="gm-about-img-wrap">
                <img src={brandBottleImg} alt="GOLDEN MOMENT Luxury Body Oil" />
              </div>
              <div className="gm-about-copy">
                <span className="gm-kicker">OUR PHILOSOPHY</span>
                <h1 className="gm-subpage-title">
                  Luxury Rooted in Nature
                </h1>
                <p>{siteConfig.about.mission}</p>
                <p>{siteConfig.about.sourcingNote}</p>
                <p>{siteConfig.about.b2bNote}</p>
                <div className="gm-about-actions">
                  <button
                    type="button"
                    className="gm-btn-gold"
                    onClick={() => navigateTo('shop', 'all')}
                  >
                    Shop Collection
                  </button>
                  <button
                    type="button"
                    className="gm-outline-btn"
                    onClick={() => navigateTo('contact')}
                  >
                    {siteConfig.about.ctaButton}
                  </button>
                </div>
              </div>
            </div>

            <div className="gm-pillars-grid">
              {siteConfig.about.cards.map((card, idx) => (
                <div key={card.title} className="gm-pillar-card">
                  <span className="gm-pillar-num">0{idx + 1}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =================================================================
          VIEW 5: FAQ
         ================================================================= */}
      {activeTab === 'faq' && renderFaqSection(true)}

      {/* =================================================================
          VIEW 6: CONTACT
         ================================================================= */}
      {activeTab === 'contact' && renderContactSection(true)}

      {/* =================================================================
          FOOTER
         ================================================================= */}
      <footer className="gm-footer">
        <div className="gm-footer-grid">
          <div className="gm-footer-brand">
            <img src={logoImg} alt={siteConfig.companyName} className="gm-footer-logo" />
            <div className="gm-footer-wordmark">
              <span>GOLDEN</span>
              <span className="gm-word-gold">MOMENT</span>
            </div>
            <p>{siteConfig.footer.description}</p>
            <div className="gm-footer-badges">
              <span><Sparkles size={12} /> Alcohol-Free Extraits</span>
              <span><ShieldCheck size={12} /> Ethical African Shea</span>
              <span><Award size={12} /> Cruelty-Free</span>
            </div>
          </div>

          <div className="gm-footer-col">
            <h4>Navigation</h4>
            <ul>
              {siteConfig.footer.menu.map((item) => (
                <li key={item.label}>
                  <button type="button" onClick={() => navigateTo(item.tab)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="gm-footer-col">
            <h4>Atelier &amp; Socials</h4>
            <ul>
              <li>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneDirectTel}`}>{siteConfig.phoneDirect}</a>
              </li>
              {siteConfig.footer.socials.map((soc) => (
                <li key={soc.label}>
                  <a href={soc.url} target="_blank" rel="noreferrer">
                    {soc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="gm-footer-col">
            <h4>Private Journal &amp; Drops</h4>
            <p className="gm-footer-news-desc">
              {siteConfig.footer.newsletterTagline}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="gm-newsletter-form">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button type="submit">SUBSCRIBE</button>
            </form>
            {newsletterSuccess && (
              <div className="gm-newsletter-ok">
                {siteConfig.footer.newsletterSuccess}
              </div>
            )}
          </div>
        </div>

        <div className="gm-footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.companyName}. {siteConfig.footer.copyrightSuffix}
          </span>
          <span>{siteConfig.footer.managedByLabel}</span>
        </div>
      </footer>

      {/* =================================================================
          SHOPPING BAG SLIDE-OVER DRAWER
         ================================================================= */}
      {cartOpen && (
        <div className="gm-drawer-backdrop" onClick={() => setCartOpen(false)}>
          <div className="gm-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="gm-cart-head">
              <div className="gm-cart-title">
                <ShoppingBag size={18} color="#9b7a2c" />
                <h3>Shopping Bag</h3>
                <span>({totalCartItems})</span>
              </div>
              <button
                type="button"
                className="gm-icon-btn"
                onClick={() => setCartOpen(false)}
                aria-label="Close bag"
              >
                <X size={20} />
              </button>
            </div>

            <div className="gm-cart-body">
              {cart.length === 0 ? (
                <div className="gm-cart-empty">
                  <ShoppingBag size={42} strokeWidth={1.2} color="#a8a29e" />
                  <h4>Your bag is empty</h4>
                  <p>Discover our Extrait body oils and cold-whipped African shea butters.</p>
                  <button
                    type="button"
                    className="gm-btn-gold"
                    onClick={() => {
                      setCartOpen(false);
                      navigateTo('shop', 'all');
                    }}
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="gm-cart-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onClick={() => {
                        viewProductDetail(item.product);
                        setCartOpen(false);
                      }}
                    />
                    <div className="gm-cart-item-info">
                      <div className="gm-cart-item-top">
                        <span>{item.product.sku}</span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <h4
                        onClick={() => {
                          viewProductDetail(item.product);
                          setCartOpen(false);
                        }}
                      >
                        {item.product.shortTitle}
                      </h4>
                      <div className="gm-cart-item-bottom">
                        <div className="gm-qty-mini">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, -1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, 1)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <strong>
                          {formatPrice(item.product.priceNumeric * item.quantity)}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="gm-cart-footer">
                <div className="gm-cart-subtotal">
                  <span>Subtotal</span>
                  <strong>{formatPrice(cartSubtotal)}</strong>
                </div>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Hello ${siteConfig.companyName}, I would like to order:\n\n` +
                      cart
                        .map(
                          (i) =>
                            `• ${i.product.name} (${i.product.sku}) × ${i.quantity} = ${formatPrice(
                              i.product.priceNumeric * i.quantity
                            )}`
                        )
                        .join('\n') +
                      `\n\nTotal: ${formatPrice(cartSubtotal)}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="gm-btn-wa"
                >
                  <MessageSquare size={16} />
                  <span>Order via WhatsApp Concierge</span>
                </a>
                <button
                  type="button"
                  className="gm-btn-gold"
                  onClick={() => {
                    setCartOpen(false);
                    setModalType('checkout');
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  className="gm-clear-cart-link"
                  onClick={clearCart}
                >
                  Clear Bag
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMessage && (
        <div className="gm-toast">
          <CheckCircle2 size={16} color="#c5a24d" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODALS: CONCIERGE / QUOTE / CHECKOUT */}
      {modalType && (
        <div className="gm-modal-backdrop" onClick={closeModal}>
          <div className="gm-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gm-modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {modalType === 'concierge' && (
              <>
                <span className="gm-kicker">GOLDEN MOMENT</span>
                <h3>Atelier Concierge</h3>
                <p className="gm-modal-sub">
                  Need help choosing a signature scent or preparing a luxury gift box? Message our team directly.
                </p>
                <form onSubmit={handleFormSubmit} className="gm-form">
                  <div className="gm-form-group">
                    <label>Your Name *</label>
                    <input type="text" required placeholder="Full name" />
                  </div>
                  <div className="gm-form-group">
                    <label>Email *</label>
                    <input type="email" required placeholder="you@example.com" />
                  </div>
                  <div className="gm-form-group">
                    <label>Preferred Scent Notes / Inquiry *</label>
                    <textarea rows={3} required placeholder="Floral rose, warm oud, vanilla shea..." />
                  </div>
                  <button type="submit" className="gm-btn-gold">
                    Send to Concierge
                  </button>
                </form>
              </>
            )}

            {modalType === 'quote' && selectedProduct && (
              <>
                <span className="gm-kicker">BOUTIQUE &amp; SPA PARTNER</span>
                <h3>Request Stockist Quote</h3>
                <p className="gm-modal-sub">
                  Inquiring for: <strong>{selectedProduct.name}</strong> ({selectedProduct.sku})
                </p>
                <form onSubmit={handleFormSubmit} className="gm-form">
                  <div className="gm-form-group">
                    <label>Full Name *</label>
                    <input type="text" required placeholder="Your name" />
                  </div>
                  <div className="gm-form-group">
                    <label>Boutique / Spa Name *</label>
                    <input type="text" required placeholder="Company name" />
                  </div>
                  <div className="gm-form-group">
                    <label>Email *</label>
                    <input type="email" required placeholder="buyer@boutique.com" />
                  </div>
                  <div className="gm-form-group">
                    <label>Estimated Quantity *</label>
                    <input type="text" required placeholder="e.g. 20 Bottles / 50 Jars" />
                  </div>
                  <button type="submit" className="gm-btn-gold">
                    Submit Stockist Request
                  </button>
                </form>
              </>
            )}

            {modalType === 'checkout' && (
              <>
                <span className="gm-kicker">ATELIER CHECKOUT</span>
                <h3>Complete Your Order</h3>
                <p className="gm-modal-sub">
                  {totalCartItems} item(s) · Total: <strong>{formatPrice(cartSubtotal)}</strong>
                </p>
                <form onSubmit={handleFormSubmit} className="gm-form">
                  <div className="gm-form-group">
                    <label>Full Name *</label>
                    <input type="text" required placeholder="Recipient name" />
                  </div>
                  <div className="gm-form-group">
                    <label>Email Address *</label>
                    <input type="email" required placeholder="you@example.com" />
                  </div>
                  <div className="gm-form-group">
                    <label>Phone / WhatsApp *</label>
                    <input type="tel" required placeholder="+966 / +44 / +1" />
                  </div>
                  <div className="gm-form-group">
                    <label>Shipping Address *</label>
                    <input type="text" required placeholder="Street, City, Country" />
                  </div>
                  <button type="submit" className="gm-btn-gold">
                    Confirm Order ({formatPrice(cartSubtotal)})
                  </button>
                </form>
              </>
            )}

            {formSubmitted && (
              <div className="gm-success-note">
                Thank you! Your request has been received by {siteConfig.companyName}.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
