/*
 * Script commun à toutes les pages du prototype Starbucks Coffee Club.
 * Il contient l’ensemble des fonctions nécessaires pour gérer le quiz,
 * la sélection des formules, le panier, le tableau de bord, les
 * récompenses, la page RSE/Refill et le formulaire entreprise.
 * Les données sont stockées dans sessionStorage afin de conserver
 * l’état entre les pages sans serveur ni base de données.
 */

(function () {
  // Utilitaire : récupérer un objet depuis sessionStorage
  function getStorageObject(key, defaultValue) {
    const item = sessionStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return defaultValue;
      }
    }
    return defaultValue;
  }

  function setStorageObject(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /*
   * Catalogue de produits Starbucks disponibles pour la sélection.
   * Chaque entrée correspond à un café précis avec son visuel, son format,
   * son intensité, ses notes et un prix indicatif. Ces informations sont
   * utilisées pour afficher des cartes produits cohérentes dans le
   * catalogue, le quiz, le panier et le tableau de bord. Les images
   * référencées proviennent du dossier local images/products selon les
   * exigences techniques et peuvent être remplacées ultérieurement par des
   * visuels officiels.
   */
  const productCatalog = [
    {
      id: 'capsule-blonde-roast',
      name: 'Starbucks® Blonde Espresso Roast',
      format: 'Capsules Vertuo / espresso',
      intensity: '6 — doux',
      tastingNotes: 'Doux, rond, notes céréalières',
      description: 'Une capsule blonde légère pour un espresso doux, parfaite le matin ou en boisson lactée.',
      imageUrl: 'images/products/starbucks-blonde-capsule-closeup.png',
      quantity: 'Étui de 10 capsules',
      price: '4,90 €',
      numericPrice: 4.90,
      category: 'capsules',
      color: '#d6aa62',
    },
    {
      id: 'capsule-house-blend',
      name: 'Starbucks® House Blend Lungo',
      format: 'Capsules Nespresso® Original',
      intensity: '8 — équilibré',
      tastingNotes: 'Noisette, cacao, rondeur',
      description: 'Un lungo équilibré et généreux, idéal pour compléter une sélection de capsules variées.',
      imageUrl: 'images/products/starbucks-house-blend-capsules.png',
      quantity: 'Étui de 10 capsules',
      price: '5,20 €',
      numericPrice: 5.20,
      category: 'capsules',
      color: '#7a542d',
    },
    {
      id: 'capsule-variety-pack',
      name: 'Pack découverte Starbucks® Capsules',
      format: 'Assortiment capsules',
      intensity: '5 à 11 — mix',
      tastingNotes: 'Caramel, Colombia, Verona, Espresso',
      description: 'Une sélection de goûts différents pour construire un abonnement sur mesure, sans rester sur un seul parfum.',
      imageUrl: 'images/products/starbucks-capsules-variety-pack.png',
      quantity: '10 étuis assortis',
      price: '39,90 €',
      numericPrice: 39.90,
      category: 'capsules',
      color: '#00704a',
    },
    {
      id: 'white-mocha-dolce-gusto-eu',
      name: 'White Mocha',
      format: 'Capsules Dolce Gusto®',
      intensity: 'Gourmand',
      tastingNotes: 'Chocolat blanc, lait onctueux',
      description: 'Une boisson douce et généreuse, pensée pour une pause White Mocha façon Starbucks.',
      imageUrl: 'images/products/white-mocha-dolce-gusto-eu.png',
      quantity: '6 portions',
      price: '5,49 €',
      numericPrice: 5.49,
      category: 'gourmand',
      color: '#b59adf',
    },
    {
      id: 'blonde-espresso-roast-beans',
      name: 'Blonde Espresso Roast Grains',
      format: 'Café en grains',
      intensity: '6 — doux',
      tastingNotes: 'Notes douces et sucrées',
      description: 'Un café blond lumineux, idéal pour les boissons lactées comme pour l’espresso.',
      imageUrl: 'images/products/blonde-espresso-roast-beans.png',
      quantity: '200 g',
      price: '7,99 €',
      numericPrice: 7.99,
      category: 'grains',
      color: '#d4a21a',
    },
    {
      id: 'espresso-roast-dark-beans-bag',
      name: 'Espresso Roast Dark Grains',
      format: 'Café en grains',
      intensity: '11 — intense',
      tastingNotes: 'Riche, caramélisé, chocolat noir',
      description: 'Un espresso roast sombre, puissant et aromatique pour les amateurs de café corsé.',
      imageUrl: 'images/products/espresso-roast-dark-beans-bag.png',
      quantity: '200 g',
      price: '7,99 €',
      numericPrice: 7.99,
      category: 'grains',
      color: '#203f33',
    },
    {
      id: 'roast-trio-beans',
      name: 'Trio torréfactions Starbucks®',
      format: 'Café en grains',
      intensity: 'Blonde, ambrée, brune',
      tastingNotes: 'Doux, équilibré, corsé',
      description: 'Trois profils pour choisir une sélection cohérente selon les préférences du client.',
      imageUrl: 'images/products/starbucks-roast-trio-beans.png',
      quantity: 'Sélection découverte',
      price: '18,90 €',
      numericPrice: 18.90,
      category: 'grains',
      color: '#29442c',
    },
    {
      id: 'blonde-espresso-roast-multipack',
      name: 'Blonde Espresso Roast Multipack',
      format: 'Café en grains',
      intensity: '6 — doux',
      tastingNotes: 'Doux, rond, sucré',
      description: 'Un visuel multipack pour présenter les offres familiales et les abonnements réguliers.',
      imageUrl: 'images/products/blonde-espresso-roast-multipack.png',
      quantity: 'Lot de sachets',
      price: '21,99 €',
      numericPrice: 21.99,
      category: 'grains',
      color: '#d7b63d',
    },
  ];

  // Fonctions utilitaires pour le catalogue
  function getProductById(id) {
    return productCatalog.find((p) => p.id === id);
  }
  function getSelectedProducts() {
    return getStorageObject('selectedProducts', []);
  }
  function addSelectedProduct(id) {
    let selected = getSelectedProducts();
    if (!selected.includes(id)) {
      selected.push(id);
      setStorageObject('selectedProducts', selected);
    }
  }
  function removeSelectedProduct(id) {
    let selected = getSelectedProducts();
    selected = selected.filter((p) => p !== id);
    setStorageObject('selectedProducts', selected);
  }
  function clearSelectedProducts() {
    setStorageObject('selectedProducts', []);
  }

  /**
   * Ouvre une fenêtre modale détaillant un produit. Elle affiche une image
   * grand format, le nom, l’intensité, les notes aromatiques, le format,
   * la quantité, le prix et une description. Un bouton permet
   * d’ajouter ce produit à la sélection et un autre ferme la fenêtre.
   * @param {Object} product L’objet produit du catalogue
   */
  function showProductDetail(product) {
    // Création de l’overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    // Contenu de la modale
    const modal = document.createElement('div');
    modal.className = 'modal-content product-modal';
    // Image grande
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.name;
    img.style.width = '100%';
    img.style.borderRadius = 'var(--border-radius)';
    modal.appendChild(img);
    // Informations
    const title = document.createElement('h3');
    title.style.marginTop = '16px';
    title.textContent = product.name;
    modal.appendChild(title);
    const meta = document.createElement('p');
    meta.innerHTML = `<strong>Format :</strong> ${product.format} – ${product.quantity}`;
    modal.appendChild(meta);
    const intensity = document.createElement('p');
    intensity.innerHTML = `<strong>Intensité :</strong> ${product.intensity}`;
    modal.appendChild(intensity);
    const notes = document.createElement('p');
    notes.innerHTML = `<strong>Notes aromatiques :</strong> ${product.tastingNotes}`;
    modal.appendChild(notes);
    const price = document.createElement('p');
    price.innerHTML = `<strong>Prix indicatif :</strong> ${product.price}`;
    modal.appendChild(price);
    const desc = document.createElement('p');
    desc.style.marginTop = '8px';
    desc.textContent = product.description;
    modal.appendChild(desc);
    // Boutons
    const btnAdd = document.createElement('button');
    btnAdd.className = 'btn btn-primary';
    btnAdd.textContent = 'Ajouter à mon abonnement';
    btnAdd.addEventListener('click', () => {
      addSelectedProduct(product.id);
      updateProductSelections();
      overlay.remove();
    });
    modal.appendChild(btnAdd);
    const btnClose = document.createElement('button');
    btnClose.className = 'btn btn-secondary';
    btnClose.style.marginLeft = '8px';
    btnClose.textContent = 'Fermer';
    btnClose.addEventListener('click', () => {
      overlay.remove();
    });
    modal.appendChild(btnClose);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  // Initialiser la page du quiz
  function initQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;
    // Questions de l’algorithme de recommandation
    const questions = [
      {
        id: 'equipment',
        question: 'Quel équipement utilisez-vous ?',
        options: [
          'Machine Nespresso Original®',
          'Machine à grains',
          'Les deux',
        ],
      },
      {
        id: 'format',
        question: 'Quel format préférez-vous ?',
        options: ['Capsules', 'Café en grains', 'Capsules + grains'],
      },
      {
        id: 'intensity',
        question: 'Quelle intensité préférez-vous ?',
        options: ['Doux', 'Équilibré', 'Intense', 'Très intense'],
      },
      {
        id: 'taste',
        question: 'Quels goûts préférez-vous ?',
        options: ['Café classique', 'Café gourmand', 'Décaféiné', 'Découverte'],
      },
      {
        id: 'consumption',
        question: 'Combien de cafés consommez-vous par semaine ?',
        options: [
          'Moins de 10',
          'Entre 10 et 20',
          'Entre 20 et 35',
          'Plus de 35',
        ],
      },
      {
        id: 'seasonal',
        question: 'Souhaitez-vous découvrir des éditions saisonnières ?',
        options: ['Oui', 'Non'],
      },
    ];
    let current = 0;
    const answers = {};

    const progressBar = quizContainer.querySelector('.progress-bar > div');
    const questionEl = quizContainer.querySelector('.question-text');
    const optionsEl = quizContainer.querySelector('.options');
    const prevBtn = quizContainer.querySelector('.btn-prev');
    const nextBtn = quizContainer.querySelector('.btn-next');
    const resultEl = quizContainer.querySelector('.result');

    function computeRecommendation(a) {
      const product = [];
      switch (a.intensity) {
        case 'Doux':
          product.push('Blonde Espresso Roast');
          break;
        case 'Équilibré':
          product.push('Single-Origin Colombia');
          break;
        case 'Intense':
          product.push('Espresso Roast');
          break;
        case 'Très intense':
          product.push('Espresso Roast');
          break;
      }
      if (a.taste === 'Café gourmand') {
        product.push('Vanille', 'Caramel', 'Chocolate Hazelnut');
      } else if (a.taste === 'Décaféiné') {
        // Recommande la version décaféinée du Blonde Espresso Roast
        product.push('Blonde Espresso Roast Décaféiné');
      } else if (a.taste === 'Découverte') {
        // Sélection découverte : plusieurs cafés pour explorer
        product.push('Blonde Espresso Roast', 'Single-Origin Colombia', 'Espresso Roast');
      } else {
        product.push('House Blend');
      }
      let plan;
      if (a.format === 'Capsules + grains' || a.equipment === 'Les deux') {
        plan = 'Coffee Duo';
      } else if (a.format === 'Capsules' || a.equipment === 'Machine Nespresso Original®') {
        plan = 'Capsules';
      } else {
        plan = 'Café en grains';
      }
      return { coffees: product, plan };
    }

    function renderQuestion() {
      const q = questions[current];
      // Update progress bar
      progressBar.style.width = `${(current / questions.length) * 100}%`;
      questionEl.textContent = `${current + 1}. ${q.question}`;
      optionsEl.innerHTML = '';
      q.options.forEach((opt) => {
        const label = document.createElement('label');
        label.className = 'option';
        if (answers[q.id] === opt) label.classList.add('selected');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = q.id;
        input.value = opt;
        if (answers[q.id] === opt) input.checked = true;
        input.addEventListener('change', () => {
          answers[q.id] = opt;
          renderQuestion();
        });
        label.appendChild(input);
        label.appendChild(document.createTextNode(opt));
        label.addEventListener('click', () => {
          answers[q.id] = opt;
          renderQuestion();
        });
        optionsEl.appendChild(label);
      });
      // Buttons state
      prevBtn.disabled = current === 0;
      nextBtn.disabled = !answers[q.id];
      nextBtn.textContent = current === questions.length - 1 ? 'Terminer' : 'Suivant';
    }

    function showResult() {
      quizContainer.querySelector('.quiz-content').style.display = 'none';
      resultEl.style.display = 'block';
      const rec = computeRecommendation(answers);
      // Afficher la formule recommandée
      resultEl.querySelector('.rec-plan').textContent = rec.plan;
      // Afficher les cafés recommandés avec images
      const recContainer = resultEl.querySelector('.rec-coffees');
      recContainer.innerHTML = '';
      rec.coffees.forEach((coffeeName) => {
        // Recherche d’un produit correspondant par son nom (insensible à la casse)
        const prod = productCatalog.find((p) => p.name.toLowerCase().includes(coffeeName.toLowerCase()));
        if (prod) {
          const item = document.createElement('div');
          item.className = 'coffee-item';
          const img = document.createElement('img');
          img.src = prod.imageUrl;
          img.alt = prod.name;
          img.style.width = '32px';
          img.style.height = '32px';
          img.style.objectFit = 'cover';
          img.style.borderRadius = 'var(--border-radius)';
          const span = document.createElement('span');
          span.textContent = prod.name;
          item.appendChild(img);
          item.appendChild(span);
          recContainer.appendChild(item);
        } else {
          // Si aucun visuel trouvé, afficher uniquement le texte
          const span = document.createElement('span');
          span.textContent = coffeeName;
          recContainer.appendChild(span);
        }
      });
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
      if (current > 0) {
        current--;
        renderQuestion();
      }
    });
    nextBtn.addEventListener('click', () => {
      if (current < questions.length - 1) {
        current++;
        renderQuestion();
      } else {
        showResult();
      }
    });

    // Démarrer le quiz
    renderQuestion();
  }

  // Initialiser la page des formules
  function initFormules() {
    const container = document.querySelector('.formules-container');
    if (!container) return;
    // Définition des formules
    const formulas = [
      {
        id: 'flex_capsules',
        name: 'Coffee Flex Capsules',
        content: '30 capsules',
        price: 11.49,
        description: 'Idéal pour les petites consommations.',
        type: 'capsules',
        recommended: false,
      },
      {
        id: 'daily_capsules',
        name: 'Daily Capsules',
        content: '60 capsules',
        price: 22.49,
        description: 'Pour les amateurs quotidiens.',
        type: 'capsules',
        recommended: false,
      },
      {
        id: 'coffee_lover',
        name: 'Coffee Lover Capsules',
        content: '100 capsules',
        price: 36.99,
        description: 'Pour les familles et les grands buveurs.',
        type: 'capsules',
        recommended: false,
      },
      {
        id: 'coffee_grains',
        name: 'Coffee Grains',
        content: '2 sachets de 450 g',
        price: 21.99,
        description: 'Pour les machines à grains.',
        type: 'grains',
        recommended: false,
      },
      {
        id: 'coffee_duo',
        name: 'Coffee Duo',
        content: '30 capsules + 1 sachet de 450 g',
        price: 22.99,
        description: 'Le meilleur des deux mondes !',
        type: 'duo',
        recommended: true,
      },
      {
        id: 'discovery',
        name: 'Discovery Box',
        content: 'Sélection découverte',
        price: 16.49,
        description: 'Une surprise à chaque livraison.',
        type: 'mix',
        recommended: false,
      },
      {
        id: 'office',
        name: 'Office Coffee',
        content: 'Offre entreprise',
        price: 0,
        description: 'Solution pour les professionnels.',
        type: 'entreprise',
        recommended: false,
      },
    ];
    const frequencies = ['Toutes les 4 semaines', 'Toutes les 6 semaines', 'Toutes les 8 semaines'];
    const deliveries = ['Domicile', 'Point relais'];
    const custom = {};

    formulas.forEach((f) => {
      custom[f.id] = {
        frequency: frequencies[0],
        delivery: deliveries[0],
        quantity: 1,
        coffeeType: f.type,
      };
    });

    function renderCards() {
      container.innerHTML = '';
      formulas.forEach((f) => {
        const card = document.createElement('div');
        card.className = 'offer-card';
        if (f.recommended) card.classList.add('recommended');
        const title = document.createElement('h3');
        title.textContent = f.name;
        const desc = document.createElement('p');
        desc.textContent = f.description;
        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = f.price > 0 ? `${f.price.toFixed(2)} € / mois` : 'Sur devis';
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(price);
        // Controls (sauf pour office)
        if (f.id !== 'office') {
          const controls = document.createElement('div');
          controls.className = 'controls';
          // Type
          const labelType = document.createElement('label');
          labelType.textContent = 'Type de café :';
          const selectType = document.createElement('select');
          selectType.value = custom[f.id].coffeeType;
          if (f.type === 'capsules') {
            selectType.innerHTML = '<option value="capsules">Capsules</option>';
          } else if (f.type === 'grains') {
            selectType.innerHTML = '<option value="grains">Grains</option>';
          } else if (f.type === 'duo') {
            selectType.innerHTML = '<option value="duo">Capsules + grains</option>';
          } else if (f.type === 'mix') {
            selectType.innerHTML = '<option value="mix">Capsules ou grains</option>';
          }
          selectType.addEventListener('change', (e) => {
            custom[f.id].coffeeType = e.target.value;
          });
          labelType.appendChild(selectType);
          controls.appendChild(labelType);
          // Frequency
          const labelFreq = document.createElement('label');
          labelFreq.textContent = 'Fréquence :';
          const selectFreq = document.createElement('select');
          frequencies.forEach((freq) => {
            const opt = document.createElement('option');
            opt.value = freq;
            opt.textContent = freq;
            if (freq === custom[f.id].frequency) opt.selected = true;
            selectFreq.appendChild(opt);
          });
          selectFreq.addEventListener('change', (e) => {
            custom[f.id].frequency = e.target.value;
          });
          labelFreq.appendChild(selectFreq);
          controls.appendChild(labelFreq);
          // Delivery
          const labelDel = document.createElement('label');
          labelDel.textContent = 'Mode de livraison :';
          const selectDel = document.createElement('select');
          deliveries.forEach((del) => {
            const opt = document.createElement('option');
            opt.value = del;
            opt.textContent = del;
            if (del === custom[f.id].delivery) opt.selected = true;
            selectDel.appendChild(opt);
          });
          selectDel.addEventListener('change', (e) => {
            custom[f.id].delivery = e.target.value;
          });
          labelDel.appendChild(selectDel);
          controls.appendChild(labelDel);
          // Quantity
          const labelQty = document.createElement('label');
          labelQty.textContent = 'Quantité :';
          const inputQty = document.createElement('input');
          inputQty.type = 'number';
          inputQty.min = 1;
          inputQty.max = 5;
          inputQty.value = custom[f.id].quantity;
          inputQty.addEventListener('input', (e) => {
            custom[f.id].quantity = parseInt(e.target.value) || 1;
          });
          labelQty.appendChild(inputQty);
          controls.appendChild(labelQty);
          card.appendChild(controls);
        }
        // Button
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.textContent = 'Choisir cette formule';
        btn.addEventListener('click', () => {
          // Enregistrer l’abonnement dans sessionStorage avec les produits sélectionnés
          const selected = getSelectedProducts();
          const subscription = {
            plan: f,
            options: custom[f.id],
            coffees: selected,
          };
          setStorageObject('subscription', subscription);
          // Redirection vers panier
          window.location.href = 'panier.html';
        });
        card.appendChild(btn);
        container.appendChild(card);
      });
    }

    renderCards();
      // Rendu du catalogue produits sous les formules
      renderProductCatalog();

      // Mettre à jour l’état visuel des cartes produits en fonction des sélections existantes
      updateProductSelections();
  }

    /**
     * Affiche l’ensemble du catalogue de produits dans la section
     * .catalogue-container du fichier formules.html. Chaque produit
     * apparaît sous forme de carte avec son image, son nom, son intensité,
     * sa description succincte et un bouton permettant de l’ajouter à la
     * sélection. Un lien « Voir le produit » ouvre une fenêtre détaillée.
     */
    function renderProductCatalog() {
      const catalogue = document.querySelector('.catalogue-container');
      if (!catalogue) return;
      catalogue.innerHTML = '';

      const builder = document.createElement('div');
      builder.className = 'custom-builder';
      builder.innerHTML = `
        <div class="builder-copy">
          <span class="eyebrow">Sélection sur mesure</span>
          <h2>Composez votre abonnement comme un panier de capsules</h2>
          <p>Choisissez plusieurs goûts Starbucks® : doux, gourmand, équilibré ou intense. Vous pouvez mixer capsules, grains et boissons gourmandes selon vos préférences.</p>
        </div>
        <div class="builder-mini-cart">
          <strong>Votre sélection</strong>
          <span class="selection-count">0 produit</span>
          <a class="btn btn-primary" href="panier.html">Voir mon panier</a>
        </div>`;
      catalogue.appendChild(builder);

      const shop = document.createElement('div');
      shop.className = 'capsule-shop';
      const aside = document.createElement('aside');
      aside.className = 'shop-filters';
      aside.innerHTML = `
        <button class="filter-btn active" data-filter="all">Tout voir</button>
        <button class="filter-btn" data-filter="capsules">Capsules</button>
        <button class="filter-btn" data-filter="grains">Grains</button>
        <button class="filter-btn" data-filter="gourmand">Gourmand</button>
        <div class="filter-box"><strong>Objectif</strong><p>Créer une box personnalisée avec plusieurs goûts au lieu d’un seul produit.</p></div>`;
      const grid = document.createElement('div');
      grid.className = 'capsule-grid';
      shop.appendChild(aside);
      shop.appendChild(grid);
      catalogue.appendChild(shop);

      productCatalog.forEach((prod) => {
        const card = document.createElement('article');
        card.className = 'product-card capsule-card';
        card.dataset.id = prod.id;
        card.dataset.category = prod.category || 'all';
        card.style.setProperty('--product-tone', prod.color || '#00704a');
        card.innerHTML = `
          <div class="capsule-visual"><img src="${prod.imageUrl}" alt="${prod.name}"></div>
          <div class="product-info">
            <span class="product-format">${prod.format}</span>
            <h4>${prod.name}</h4>
            <p><strong>Intensité :</strong> ${prod.intensity}</p>
            <p><strong>Notes :</strong> ${prod.tastingNotes}</p>
            <p class="product-price"><strong>${prod.price}</strong> / ${prod.quantity}</p>
            <div class="quantity-pills" aria-label="Quantité">
              <button type="button" data-qty="10">10</button>
              <button type="button" data-qty="20">20</button>
              <button type="button" data-qty="30">30</button>
              <button type="button" data-qty="50">50</button>
            </div>
            <div class="product-actions">
              <button class="add-btn">+ Ajouter</button>
              <button class="btn-detail">Détails</button>
            </div>
          </div>`;
        card.querySelectorAll('.quantity-pills button').forEach((qbtn) => {
          qbtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.querySelectorAll('.quantity-pills button').forEach((b) => b.classList.remove('active'));
            qbtn.classList.add('active');
            addSelectedProduct(prod.id);
            updateProductSelections();
          });
        });
        card.querySelector('.add-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          addSelectedProduct(prod.id);
          updateProductSelections();
        });
        card.querySelector('.btn-detail').addEventListener('click', (e) => {
          e.stopPropagation();
          showProductDetail(prod);
        });
        card.addEventListener('click', () => {
          addSelectedProduct(prod.id);
          updateProductSelections();
        });
        grid.appendChild(card);
      });

      aside.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          aside.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.dataset.filter;
          grid.querySelectorAll('.capsule-card').forEach((card) => {
            card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none';
          });
        });
      });
    }

    /**
     * Met à jour l’apparence des cartes produits pour refléter la sélection
     * actuelle. Les cartes sélectionnées reçoivent une classe « selected ».
     */
    function updateProductSelections() {
      const selected = new Set(getSelectedProducts());
      document.querySelectorAll('.product-card').forEach((card) => {
        const id = card.dataset.id;
        if (selected.has(id)) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
      document.querySelectorAll('.selection-count').forEach((el) => {
        el.textContent = selected.size + (selected.size > 1 ? ' produits' : ' produit');
      });
    }

  // Initialiser la page Panier
  function initPanier() {
    const panierContainer = document.querySelector('.panier-container');
    if (!panierContainer) return;
    const subscription = getStorageObject('subscription', null);
    if (subscription && (!subscription.coffees || subscription.coffees.length === 0)) {
      const stored = getSelectedProducts();
      if (stored.length > 0) {
        subscription.coffees = stored;
        setStorageObject('subscription', subscription);
      }
    }
    const user = getStorageObject('user', {
      name: 'Camille',
      stars: 125,
      history: [
        { date: '22 avril 2026', items: 'Coffee Duo : House Blend, Colombia et Espresso Roast' },
        { date: '22 mars 2026', items: 'Daily Capsules : Espresso Roast' },
      ],
    });
    let confirmed = false;
    if (!subscription || !subscription.plan) {
      panierContainer.innerHTML = `<p>Aucune formule sélectionnée. Rendez-vous sur la page des <a href="formules.html">formules</a>.</p>`;
      return;
    }

    function calcProductsTotal(ids) {
      return (ids || []).reduce((sum, id) => {
        const prod = getProductById(id);
        return sum + (prod && prod.numericPrice ? prod.numericPrice : 0);
      }, 0);
    }

    function render() {
      panierContainer.innerHTML = '';
      if (!confirmed) {
        const plan = subscription.plan;
        const options = subscription.options || {};
        const selectedIds = subscription.coffees || [];
        const planTotal = plan.price * (options.quantity || 1);
        const productsTotal = calcProductsTotal(selectedIds);
        const totalPrice = planTotal + productsTotal;
        const bonus = Math.round(totalPrice * 2);

        const layout = document.createElement('div');
        layout.className = 'cart-layout';
        const left = document.createElement('div');
        left.className = 'cart-main-panel';
        const right = document.createElement('aside');
        right.className = 'cart-side-panel';

        left.innerHTML = `<span class="eyebrow">Votre abonnement</span><h2>Récapitulatif de votre box Starbucks</h2><p class="cart-intro">Votre panier peut contenir plusieurs goûts : vous n’êtes pas obligé de rester sur une seule capsule.</p>`;
        const summaryList = document.createElement('div');
        summaryList.className = 'summary';
        const rows = [
          { label: 'Formule', value: plan.name },
          { label: 'Base abonnement', value: plan.content },
          { label: 'Fréquence', value: options.frequency || 'Toutes les 4 semaines' },
          { label: 'Livraison', value: options.delivery || 'Domicile' },
          { label: 'Produits sélectionnés', value: `${selectedIds.length} goût(s)` },
          { label: 'Total estimé', value: `${totalPrice.toFixed(2)} € / mois` },
          { label: 'Bonus Rewards', value: `${bonus} ☆` },
        ];
        rows.forEach((r) => {
          const item = document.createElement('div');
          item.className = 'summary-item';
          item.innerHTML = `<span>${r.label}</span><span class="value">${r.value}</span>`;
          summaryList.appendChild(item);
        });
        left.appendChild(summaryList);

        const coffeesSection = document.createElement('div');
        coffeesSection.className = 'selected-coffees';
        coffeesSection.innerHTML = '<h3>Votre sélection de cafés</h3>';
        const list = document.createElement('div');
        list.className = 'coffee-list coffee-list-large';
        selectedIds.forEach((id) => {
          const prod = getProductById(id);
          if (prod) {
            const item = document.createElement('div');
            item.className = 'coffee-item';
            item.innerHTML = `<img src="${prod.imageUrl}" alt="${prod.name}"><span><strong>${prod.name}</strong><small>${prod.format} • ${prod.price}</small></span>`;
            list.appendChild(item);
          }
        });
        if (selectedIds.length === 0) {
          list.innerHTML = '<p>Ajoutez plusieurs cafés depuis la page Nos formules pour créer une box vraiment personnalisée.</p>';
        }
        coffeesSection.appendChild(list);
        const edit = document.createElement('a');
        edit.href = 'formules.html#catalogue-section';
        edit.className = 'btn btn-secondary';
        edit.textContent = 'Modifier ma sélection';
        coffeesSection.appendChild(edit);
        left.appendChild(coffeesSection);

        right.innerHTML = `<h3>Vous apprécierez également</h3><p>Suggestions ajoutées à côté du panier pour encourager le complément de commande.</p>`;
        const suggestions = productCatalog.filter((p) => !selectedIds.includes(p.id)).slice(0, 3);
        suggestions.forEach((prod) => {
          const sug = document.createElement('div');
          sug.className = 'upsell-card';
          sug.innerHTML = `<img src="${prod.imageUrl}" alt="${prod.name}"><div><strong>${prod.name}</strong><small>${prod.tastingNotes}</small><b>${prod.price}</b></div><button type="button">+</button>`;
          sug.querySelector('button').addEventListener('click', () => {
            addSelectedProduct(prod.id);
            subscription.coffees = getSelectedProducts();
            setStorageObject('subscription', subscription);
            render();
          });
          right.appendChild(sug);
        });
        const confirmDiv = document.createElement('div');
        confirmDiv.className = 'confirm sticky-confirm';
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.textContent = 'Valider mon panier';
        btn.addEventListener('click', () => {
          confirmed = true;
          user.stars += bonus;
          setStorageObject('user', user);
          user.history.unshift({
            date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
            items: `${plan.name} — ${selectedIds.length} goût(s)`,
          });
          render();
        });
        confirmDiv.appendChild(btn);
        right.appendChild(confirmDiv);

        layout.appendChild(left);
        layout.appendChild(right);
        panierContainer.appendChild(layout);
      } else {
        const done = document.createElement('div');
        done.className = 'cart-success';
        done.innerHTML = `<h2>Félicitations !</h2><p>Votre Starbucks Coffee Club est activé.</p><p>Votre première livraison est prévue le ${getNextDeliveryDate(14)}.</p><a href="dashboard.html" class="btn btn-primary">Accéder à mon espace client</a>`;
        panierContainer.appendChild(done);
      }
    }
    render();
  }

  // Initialiser le tableau de bord
  function initDashboard() {
    const dashboard = document.querySelector('.dashboard-container');
    if (!dashboard) return;
    let subscription = getStorageObject('subscription', {});
    let user = getStorageObject('user', {
      name: 'Camille',
      stars: 125,
      history: [
        { date: '22 avril 2026', items: 'Coffee Duo : House Blend, Colombia et Espresso Roast' },
        { date: '22 mars 2026', items: 'Daily Capsules : Espresso Roast' },
      ],
    });
    // Utiliser la sélection globale si l’abonnement ne contient pas encore de cafés
    if (subscription && (!subscription.coffees || subscription.coffees.length === 0)) {
      const storedCoffees = getSelectedProducts();
      if (storedCoffees.length > 0) {
        subscription.coffees = storedCoffees;
        setStorageObject('subscription', subscription);
      }
    }

    function getFidelityLevel(stars) {
      if (stars >= 300) return 'Or';
      if (stars >= 150) return 'Argent';
      return 'Bronze';
    }
    function render() {
      dashboard.innerHTML = '';
      const h2 = document.createElement('h2');
      h2.textContent = `Bonjour ${user.name}`;
      dashboard.appendChild(h2);
      // Abonnement
      const cardAb = document.createElement('div');
      cardAb.className = 'dashboard-card';
      const h3ab = document.createElement('h3');
      h3ab.textContent = 'Mon abonnement';
      cardAb.appendChild(h3ab);
      if (subscription && subscription.plan) {
        const p1 = document.createElement('p');
        p1.innerHTML = `<strong>Formule actuelle :</strong> ${subscription.plan.name}`;
        const p2 = document.createElement('p');
        p2.innerHTML = `<strong>Prochaine livraison :</strong> ${getNextDeliveryDate(14)}`;
        // Liste des cafés sélectionnés
        // Affichage sous forme de vignettes avec noms
        const coffeesContainer = document.createElement('div');
        coffeesContainer.className = 'selected-coffees';
        const cafesTitle = document.createElement('h4');
        cafesTitle.textContent = 'Cafés sélectionnés :';
        coffeesContainer.appendChild(cafesTitle);
        const list = document.createElement('div');
        list.className = 'coffee-list';
        if (subscription.coffees && subscription.coffees.length > 0) {
          subscription.coffees.forEach((id) => {
            const prod = getProductById(id);
            if (prod) {
              const item = document.createElement('div');
              item.className = 'coffee-item';
              const img = document.createElement('img');
              img.src = prod.imageUrl;
              img.alt = prod.name;
              const span = document.createElement('span');
              span.textContent = prod.name;
              item.appendChild(img);
              item.appendChild(span);
              list.appendChild(item);
            }
          });
        } else {
          const item = document.createElement('div');
          item.className = 'coffee-item';
          const span = document.createElement('span');
          span.textContent = 'Aucune sélection';
          item.appendChild(span);
          list.appendChild(item);
        }
        coffeesContainer.appendChild(list);
        // Livraison
        const deliveryP = document.createElement('p');
        deliveryP.style.marginTop = '8px';
        deliveryP.innerHTML = `<strong>Livraison :</strong> ${subscription.options && subscription.options.delivery ? subscription.options.delivery : 'Domicile'}`;
        coffeesContainer.appendChild(deliveryP);
        cardAb.appendChild(p1);
        cardAb.appendChild(p2);
        cardAb.appendChild(coffeesContainer);
      } else {
        const p = document.createElement('p');
        p.textContent = 'Aucun abonnement en cours.';
        cardAb.appendChild(p);
      }
      dashboard.appendChild(cardAb);
      // Rewards
      const cardRw = document.createElement('div');
      cardRw.className = 'dashboard-card';
      const h3rw = document.createElement('h3');
      h3rw.textContent = 'Starbucks Rewards';
      const pStars = document.createElement('p');
      pStars.innerHTML = `<strong>Étoiles accumulées :</strong> ${user.stars} ☆`;
      const pLvl = document.createElement('p');
      pLvl.innerHTML = `<strong>Niveau de fidélité :</strong> ${getFidelityLevel(user.stars)}`;
      cardRw.appendChild(h3rw);
      cardRw.appendChild(pStars);
      cardRw.appendChild(pLvl);
      dashboard.appendChild(cardRw);
      // Historique
      const cardHist = document.createElement('div');
      cardHist.className = 'dashboard-card';
      const h3hist = document.createElement('h3');
      h3hist.textContent = 'Historique des commandes';
      const ul = document.createElement('ul');
      ul.className = 'history-list';
      user.history.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.date} : ${item.items}`;
        ul.appendChild(li);
      });
      cardHist.appendChild(h3hist);
      cardHist.appendChild(ul);
      dashboard.appendChild(cardHist);
      // Actions
      const cardAct = document.createElement('div');
      cardAct.className = 'dashboard-card';
      const h3act = document.createElement('h3');
      h3act.textContent = 'Actions';
      cardAct.appendChild(h3act);
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'actions';
      const actions = [
        { label: 'Modifier mon abonnement', fn: () => { window.location.href = 'formules.html'; } },
        { label: 'Mettre en pause', fn: () => showModal('Votre abonnement a été mis en pause. Vous pouvez le réactiver à tout moment.') },
        { label: 'Reporter ma livraison', fn: () => showModal('Votre prochaine livraison a été reportée d’une semaine (simulation).') },
        { label: 'Ajouter une variété', fn: addVariety },
        { label: 'Changer mon adresse', fn: () => showModal('Votre adresse a été modifiée (simulation).') },
        { label: 'Résilier mon abonnement', fn: cancelSubscription },
      ];
      actions.forEach((a) => {
        const b = document.createElement('button');
        b.textContent = a.label;
        b.addEventListener('click', a.fn);
        actionsDiv.appendChild(b);
      });
      cardAct.appendChild(actionsDiv);
      dashboard.appendChild(cardAct);
    }
    function showModal(message) {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      const modal = document.createElement('div');
      modal.className = 'modal-content';
      const h3 = document.createElement('h3');
      h3.textContent = 'Information';
      const p = document.createElement('p');
      p.textContent = message;
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary';
      btn.textContent = 'Fermer';
      btn.addEventListener('click', () => {
        overlay.remove();
      });
      modal.appendChild(h3);
      modal.appendChild(p);
      modal.appendChild(btn);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    }
    function addVariety() {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      const modal = document.createElement('div');
      modal.className = 'modal-content product-modal';
      const h3 = document.createElement('h3');
      h3.textContent = 'Ajouter une variété';
      modal.appendChild(h3);
      const p = document.createElement('p');
      p.textContent = 'Sélectionnez les cafés à ajouter :';
      modal.appendChild(p);
      // Liste des produits disponibles
      const list = document.createElement('div');
      list.className = 'coffee-list';
      const selected = new Set(subscription.coffees || []);
      productCatalog.forEach((prod) => {
        const item = document.createElement('div');
        item.className = 'coffee-item';
        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '8px';
        checkbox.checked = selected.has(prod.id);
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) selected.add(prod.id);
          else selected.delete(prod.id);
        });
        // Image et nom
        const img = document.createElement('img');
        img.src = prod.imageUrl;
        img.alt = prod.name;
        img.style.width = '32px';
        img.style.height = '32px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = 'var(--border-radius)';
        const span = document.createElement('span');
        span.textContent = prod.name;
        item.appendChild(checkbox);
        item.appendChild(img);
        item.appendChild(span);
        list.appendChild(item);
      });
      modal.appendChild(list);
      // Boutons de validation
      const btnContainer = document.createElement('div');
      btnContainer.style.marginTop = '16px';
      const btnValidate = document.createElement('button');
      btnValidate.className = 'btn btn-primary';
      btnValidate.textContent = 'Valider';
      btnValidate.addEventListener('click', () => {
        subscription.coffees = Array.from(selected);
        setStorageObject('subscription', subscription);
        // Synchroniser la sélection globale
        setStorageObject('selectedProducts', subscription.coffees);
        overlay.remove();
        render();
      });
      const btnClose = document.createElement('button');
      btnClose.className = 'btn btn-secondary';
      btnClose.style.marginLeft = '8px';
      btnClose.textContent = 'Annuler';
      btnClose.addEventListener('click', () => {
        overlay.remove();
      });
      btnContainer.appendChild(btnValidate);
      btnContainer.appendChild(btnClose);
      modal.appendChild(btnContainer);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    }
    function cancelSubscription() {
      subscription = {};
      setStorageObject('subscription', subscription);
      showModal('Votre abonnement a été résilié (simulation).');
      render();
    }
    render();
  }

  // Page Rewards
  function initRewards() {
    const rewards = document.querySelector('.rewards-container');
    if (!rewards) return;
    const user = getStorageObject('user', {
      name: 'Camille',
      stars: 125,
      history: [],
    });
    const next = 150;
    const progress = Math.min((user.stars / next) * 100, 100);
    rewards.querySelector('.progress-inner').style.width = progress + '%';
    rewards.querySelector('.stars-count').textContent = `${user.stars} ☆ / ${next} ☆`;
  }

  // Page RSE
  function initRse() {
    const btn = document.querySelector('#show-refill');
    if (!btn) return;
    const steps = document.querySelector('.refill-steps');
    btn.addEventListener('click', () => {
      steps.style.display = 'grid';
      btn.style.display = 'none';
    });
  }

  // Page Office
  function initOffice() {
    const form = document.querySelector('#office-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      const message = document.createElement('p');
      message.textContent =
        'Merci pour votre demande. Notre équipe vous contactera très prochainement pour établir un devis personnalisé.';
      form.parentNode.appendChild(message);
    });
  }

  /*
   * Initialise le carrousel de la page d'accueil. Cette fonction utilise
   * JavaScript pour modifier l'opacité des différentes diapositives de
   * l'élément .slider afin de créer un effet de fondu enchaîné. Les
   * diapositives sont changées toutes les 6 secondes. Si aucune
   * diapositive n'est trouvée, la fonction ne fait rien.
   */
  function initSlider() {
    const slides = document.querySelectorAll('.slider .slide');
    if (!slides || slides.length === 0) return;
    slides.forEach((slide) => {
      slide.style.transition = 'opacity 1s ease-in-out';
      slide.style.opacity = '0';
    });
    let index = 0;
    // Afficher la première diapositive immédiatement
    slides[0].style.opacity = '1';
    setInterval(() => {
      slides[index].style.opacity = '0';
      index = (index + 1) % slides.length;
      slides[index].style.opacity = '1';
    }, 6000);
  }

  // Lancer les initialisations après chargement du DOM
  document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initFormules();
    initPanier();
    initDashboard();
    initRewards();
    initRse();
    initOffice();
    initSlider();
  });

  // Logo officiel flottant + navigation plus vivante
  function initOfficialStarbucksLogo() {
    if (!document.querySelector('.floating-starbucks-logo')) {
      const logo = document.createElement('a');
      logo.className = 'floating-starbucks-logo';
      logo.href = 'index.html';
      logo.setAttribute('aria-label', 'Retour accueil Starbucks Coffee Club');
      logo.innerHTML = '<img src="images/starbucks-official-logo.png" alt="Logo officiel Starbucks">';
      document.body.appendChild(logo);
    }
    window.addEventListener('scroll', () => {
      const logo = document.querySelector('.floating-starbucks-logo');
      const nav = document.querySelector('nav');
      if (logo) logo.classList.toggle('is-scrolling', window.scrollY > 40);
      if (nav) nav.classList.toggle('nav-scrolled', window.scrollY > 30);
    }, { passive: true });

    const slides = [...document.querySelectorAll('.slide')];
    const dots = [...document.querySelectorAll('.hero-dot')];
    const progress = document.querySelector('.hero-progress span');
    let active = 0;
    function showSlide(index) {
      if (!slides.length) return;
      active = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === active));
      dots.forEach((d, i) => d.classList.toggle('active', i === active));
      if (progress) {
        progress.style.transition = 'none';
        progress.style.width = '0%';
        requestAnimationFrame(() => {
          progress.style.transition = 'width 5s linear';
          progress.style.width = '100%';
        });
      }
    }
    if (slides.length) {
      showSlide(0);
      setInterval(() => showSlide(active + 1), 5000);
      dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
    }
  }
  document.addEventListener('DOMContentLoaded', initOfficialStarbucksLogo);

})();
/* === DYHIA FINAL — système Starbucks inspiré panier capsules sur mesure === */
(function(){
  const products = [
    {id:'smooth-caramel', name:'Starbucks® Smooth Caramel', family:'Vertuo · Capsule', taste:'Caramel doux', intensity:5, price:0.69, pack:'Étui de 10', img:'images/products/starbucks-capsules-variety-pack.png', color:'#b87333'},
    {id:'creamy-vanilla', name:'Starbucks® Creamy Vanilla', family:'Vertuo · Capsule', taste:'Vanille & biscuit', intensity:5, price:0.69, pack:'Étui de 10', img:'images/products/starbucks-blonde-capsule-closeup.png', color:'#d6aa62'},
    {id:'blonde-espresso', name:'Starbucks® Blonde Espresso Roast', family:'Vertuo · Capsule', taste:'Doux & sucré', intensity:6, price:0.49, pack:'Étui de 10', img:'images/products/starbucks-blonde-capsule-closeup.png', color:'#d8b261'},
    {id:'pike-place', name:'Starbucks® Pike Place® Roast', family:'Vertuo · Capsule', taste:'Rond & cacao', intensity:7, price:0.69, pack:'Étui de 10', img:'images/products/starbucks-capsules-catalogue-grid.png', color:'#00856f'},
    {id:'single-origin-colombia', name:'Starbucks® Single Origin Colombia', family:'Vertuo · Capsule', taste:'Noix & floral', intensity:7, price:0.75, pack:'Étui de 10', img:'images/products/starbucks-capsules-variety-pack.png', color:'#d85a3a'},
    {id:'espresso-roast', name:'Starbucks® Espresso Roast', family:'Vertuo · Capsule', taste:'Intense & caramélisé', intensity:11, price:0.49, pack:'Étui de 10', img:'images/products/starbucks-capsules-variety-pack.png', color:'#1c3145'},
    {id:'house-blend-lungo', name:'Starbucks® House Blend Lungo', family:'Original · Capsule', taste:'Noisette & cacao', intensity:8, price:0.52, pack:'Étui de 10', img:'images/products/starbucks-house-blend-lungo-pack.jpeg', color:'#7a542d'},
    {id:'white-mocha', name:'Starbucks® White Mocha', family:'Dolce Gusto · Boisson', taste:'Chocolat blanc', intensity:3, price:0.92, pack:'6 portions', img:'images/products/white-mocha-dolce-gusto-eu.png', color:'#b59adf'}
  ];
  const qtys = [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140];
  const suggestions = ['creamy-vanilla','house-blend-lungo','white-mocha'];
  const money = n => n.toFixed(2).replace('.', ',') + '€';
  function getBox(){ try{return JSON.parse(sessionStorage.getItem('starbucksCustomBox')||'{}')}catch(e){return{}} }
  function setBox(box){ sessionStorage.setItem('starbucksCustomBox', JSON.stringify(box)); }
  function totalCaps(box){ return Object.values(box).reduce((a,b)=>a+(+b||0),0); }
  function totalPrice(box){ return Object.entries(box).reduce((s,[id,q])=>{const p=products.find(x=>x.id===id); return s+(p?p.price*q:0)},0); }
  function chosenProducts(box){ return Object.entries(box).filter(([,q])=>q>0).map(([id,q])=>({...products.find(p=>p.id===id), qty:q})); }

  function syncLegacySubscription(){
    const box = getBox();
    const selected = chosenProducts(box).map(p=>p.id);
    sessionStorage.setItem('selectedProducts', JSON.stringify(selected));
    const sub = JSON.parse(sessionStorage.getItem('subscription')||'{}');
    if(!sub.plan){ sub.plan = {name:'Abonnement sur mesure capsules', content:'Sélection multi-goûts Starbucks', price:0}; }
    sub.options = sub.options || {frequency:'Toutes les 4 semaines', delivery:'Domicile', quantity:1, coffeeType:'capsules'};
    sub.coffees = selected;
    sub.customBox = box;
    sessionStorage.setItem('subscription', JSON.stringify(sub));
  }

  function renderCustomFormules(){
    const catalogue = document.querySelector('.catalogue-container');
    if(!catalogue) return;
    const formulas = document.querySelector('.formules-container');
    if(formulas){
      formulas.innerHTML = `
        <article class="smart-plan-card"><span>Le plus libre</span><h3>Abonnement sur mesure capsules</h3><p>Choisissez plusieurs goûts Starbucks® dans la même livraison : 10, 20, 30 capsules ou plus par parfum.</p><strong>Prix calculé selon votre sélection</strong><a href="#catalogue-section" class="btn btn-primary">Composer ma box</a></article>
        <article class="smart-plan-card"><span>Recommandé</span><h3>Box mix préférences</h3><p>Une sélection équilibrée selon vos envies : doux, gourmand, intense, lungo ou espresso.</p><strong>À partir de 19,90€ / mois</strong><a href="#catalogue-section" class="btn btn-secondary">Choisir mes goûts</a></article>
        <article class="smart-plan-card"><span>Famille / bureau</span><h3>Grande réserve Starbucks</h3><p>Créez une réserve avec plusieurs capsules et ajoutez des boissons gourmandes en supplément.</p><strong>Quantité flexible</strong><a href="#catalogue-section" class="btn btn-secondary">Préparer le panier</a></article>`;
    }
    catalogue.innerHTML = `
      <section class="starbucks-shop-header">
        <div><span class="eyebrow">Catalogue capsules</span><h2>Composez votre box Starbucks comme un panier Nespresso, mais à votre goût.</h2><p>Ajoutez plusieurs cafés différents, choisissez les quantités par goût, puis validez votre abonnement sur mesure.</p></div>
        <button class="drawer-open" type="button">🛒 Voir ma sélection <b class="cart-badge">0</b></button>
      </section>
      <section class="coffee-builder-layout">
        <aside class="coffee-filters">
          <button class="filter-btn active" data-filter="all">Tous les cafés</button>
          <button class="filter-btn" data-filter="doux">Doux / Blonde</button>
          <button class="filter-btn" data-filter="gourmand">Gourmand</button>
          <button class="filter-btn" data-filter="intense">Intense</button>
          <div class="filter-note"><strong>Abonnement sur mesure</strong><p>Vous pouvez mélanger plusieurs goûts dans la même offre.</p></div>
        </aside>
        <div class="coffee-products-grid"></div>
      </section>
      <aside class="cart-drawer" aria-hidden="true"><button class="cart-close" type="button">×</button><div class="drawer-content"></div></aside><div class="drawer-shadow"></div>`;
    const grid = catalogue.querySelector('.coffee-products-grid');
    products.forEach(p=>{
      const level = p.intensity <= 6 ? 'doux' : p.intensity >= 10 ? 'intense' : (p.taste.toLowerCase().includes('vanille')||p.taste.toLowerCase().includes('caramel')||p.taste.toLowerCase().includes('chocolat')) ? 'gourmand' : 'all';
      const card = document.createElement('article'); card.className='coffee-product-card'; card.dataset.filter=level; card.dataset.id=p.id;
      card.innerHTML = `<div class="capsule-img-wrap" style="--tone:${p.color}"><img src="${p.img}" alt="${p.name}"></div><small>${p.family}</small><h3>${p.name}</h3><p>${p.taste}</p><div class="intensity-row"><span>Intensité ${p.intensity}</span><i>${'▮'.repeat(Math.min(p.intensity,11))}</i></div><strong class="unit-price">${money(p.price)} <em>/ capsule</em></strong><button class="add-round" type="button">+</button><div class="qty-line"><span>Quantité</span><b data-qty-label>0</b></div></article>`;
      card.querySelector('.add-round').addEventListener('click', e=>{e.stopPropagation(); openQtyPopup(p, card);});
      card.addEventListener('click', ()=>openQtyPopup(p, card));
      grid.appendChild(card);
    });
    catalogue.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
      catalogue.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const f=btn.dataset.filter;
      catalogue.querySelectorAll('.coffee-product-card').forEach(c=>c.style.display = f==='all'||c.dataset.filter===f ? '' : 'none');
    }));
    catalogue.querySelector('.drawer-open').addEventListener('click', openDrawer);
    catalogue.querySelector('.cart-close').addEventListener('click', closeDrawer);
    catalogue.querySelector('.drawer-shadow').addEventListener('click', closeDrawer);
    updateCards();
  }

  function openQtyPopup(product, card){
    document.querySelectorAll('.qty-popup').forEach(p=>p.remove());
    const box = getBox();
    const pop = document.createElement('div'); pop.className='qty-popup';
    pop.innerHTML = `<div class="qty-grid">${qtys.map(q=>`<button class="${box[product.id]==q?'active':''}" data-q="${q}">${q===0?'🗑️ 0':q}</button>`).join('')}</div><div class="qty-footer"><span>Choisissez une quantité</span><button>OK</button></div>`;
    card.appendChild(pop);
    pop.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',e=>{ box[product.id]=+b.dataset.q; if(box[product.id]===0) delete box[product.id]; setBox(box); syncLegacySubscription(); updateCards(); pop.querySelectorAll('button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); }));
    pop.querySelector('.qty-footer button').addEventListener('click',e=>{e.stopPropagation(); pop.remove(); openDrawer();});
  }

  function updateCards(){
    const box=getBox();
    document.querySelectorAll('.coffee-product-card').forEach(card=>{ const q=box[card.dataset.id]||0; card.classList.toggle('selected', q>0); const lab=card.querySelector('[data-qty-label]'); if(lab) lab.textContent=q; });
    document.querySelectorAll('.cart-badge').forEach(b=>b.textContent=totalCaps(box));
    const d=document.querySelector('.drawer-content'); if(d) renderDrawerContent(d);
  }
  function renderDrawerContent(node){
    const box=getBox(); const items=chosenProducts(box); const total=totalPrice(box);
    node.innerHTML = `<h2>Votre panier</h2><p class="cart-sub">Capsules Starbucks sélectionnées (${totalCaps(box)})</p><div class="drawer-items">${items.length?items.map(p=>`<div class="drawer-item"><img src="${p.img}" alt="${p.name}"><div><strong>${p.name}</strong><small>${p.qty} × ${money(p.price)}</small><button data-remove="${p.id}">Supprimer</button></div><b>${p.qty}</b></div>`).join(''):'<p>Ajoutez des capsules pour composer votre box.</p>'}</div><h3>Vous apprécierez également</h3><div class="drawer-suggestions">${products.filter(p=>!box[p.id]).slice(0,3).map(p=>`<button data-suggest="${p.id}"><img src="${p.img}" alt=""><span>${p.name}<small>${p.taste}</small></span><b>+</b></button>`).join('')}</div><div class="drawer-total"><span>Total estimé</span><strong>${money(total)}</strong></div><button class="btn btn-primary validate-custom-cart">Valider cette sélection</button>`;
    node.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{const bx=getBox(); delete bx[b.dataset.remove]; setBox(bx); syncLegacySubscription(); updateCards();}));
    node.querySelectorAll('[data-suggest]').forEach(b=>b.addEventListener('click',()=>{const bx=getBox(); bx[b.dataset.suggest]=10; setBox(bx); syncLegacySubscription(); updateCards();}));
    const val=node.querySelector('.validate-custom-cart'); if(val) val.addEventListener('click',()=>{ syncLegacySubscription(); window.location.href='panier.html'; });
  }
  function openDrawer(){ const d=document.querySelector('.cart-drawer'); if(d){d.classList.add('open'); document.querySelector('.drawer-shadow')?.classList.add('open'); updateCards();} }
  function closeDrawer(){ document.querySelector('.cart-drawer')?.classList.remove('open'); document.querySelector('.drawer-shadow')?.classList.remove('open'); }

  function renderCustomPanier(){
    const wrap=document.querySelector('.panier-container'); if(!wrap) return;
    const box=getBox(); const items=chosenProducts(box); if(!items.length) return;
    const total=totalPrice(box); const delivery=new Date(); delivery.setDate(delivery.getDate()+14);
    wrap.innerHTML = `<div class="final-cart-layout"><section class="final-cart-main"><span class="eyebrow">Abonnement sur mesure</span><h1>Votre box Starbucks personnalisée</h1><p>Vous avez sélectionné plusieurs goûts dans une seule offre. La quantité reste modifiable avant validation.</p><div class="final-items">${items.map(p=>`<article><img src="${p.img}" alt="${p.name}"><div><h3>${p.name}</h3><p>${p.family} · ${p.taste}</p><small>${p.qty} capsules · ${money(p.price)} / capsule</small></div><strong>${money(p.qty*p.price)}</strong></article>`).join('')}</div><a class="btn btn-secondary" href="formules.html#catalogue-section">Modifier ma sélection</a></section><aside class="final-cart-side"><h2>Votre panier</h2><div class="total-line"><span>Capsules</span><b>${totalCaps(box)}</b></div><div class="total-line"><span>Total estimé</span><b>${money(total)}</b></div><p>Première livraison prévue le ${delivery.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}.</p><button class="btn btn-primary final-confirm">Valider mon abonnement</button><h3>Ajouter en plus</h3>${products.filter(p=>!box[p.id]).slice(0,2).map(p=>`<button class="side-extra" data-extra="${p.id}"><img src="${p.img}" alt=""><span>${p.name}<small>${p.taste}</small></span><b>+</b></button>`).join('')}</aside></div>`;
    wrap.querySelectorAll('[data-extra]').forEach(b=>b.addEventListener('click',()=>{const bx=getBox(); bx[b.dataset.extra]=10; setBox(bx); syncLegacySubscription(); renderCustomPanier();}));
    wrap.querySelector('.final-confirm').addEventListener('click',()=>{wrap.innerHTML=`<div class="cart-success"><h2>Félicitations !</h2><p>Votre Starbucks Coffee Club sur mesure est activé.</p><p>Votre première livraison est prévue le ${delivery.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}.</p><a href="dashboard.html" class="btn btn-primary">Accéder à mon espace client</a></div>`;});
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{renderCustomFormules(); renderCustomPanier();},80));
})();
