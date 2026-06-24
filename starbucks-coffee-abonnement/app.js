/*
 * Code principal de l’application Starbucks Coffee Club. Ce fichier
 * définit toutes les pages et la logique nécessaire pour simuler un
 * service d’abonnement au café. Les données sont stockées dans un
 * contexte React afin de les partager entre les différentes pages.
 */

const {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} = ReactRouterDOM;

// Contexte partagé pour l’abonnement et l’utilisateur
const AppContext = React.createContext();

function App() {
  // Subscription contient les détails de la formule choisie et des options
  const [subscription, setSubscription] = React.useState({
    plan: null,
    options: {},
    coffees: [],
  });
  // Données utilisateur fictives pour le tableau de bord
  const [user, setUser] = React.useState({
    name: 'Camille',
    stars: 125,
    history: [
      {
        date: '22 avril 2026',
        items: 'Coffee Duo : House Blend, Colombia et Espresso Roast',
      },
      {
        date: '22 mars 2026',
        items: 'Daily Capsules : Espresso Roast',
      },
    ],
  });
  return (
    <AppContext.Provider value={{ subscription, setSubscription, user, setUser }}>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/formules" element={<Formulas />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/rse" element={<RsePage />} />
            <Route path="/office" element={<OfficePage />} />
            {/* Fallback : redirection vers l’accueil */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

/* Barre de navigation principale */
function Navbar() {
  return (
    <nav>
      <div className="logo">
        <i className="fas fa-mug-hot" style={{ marginRight: 8 }}></i>
        Starbucks Coffee Club
      </div>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/quiz">My Coffee Match</Link>
        </li>
        <li>
          <Link to="/formules">Nos formules</Link>
        </li>
        <li>
          <Link to="/rewards">Rewards</Link>
        </li>
        <li>
          <Link to="/rse">RSE & Refill</Link>
        </li>
        <li>
          <Link to="/dashboard">Espace client</Link>
        </li>
        <li>
          <Link to="/office">Offre entreprise</Link>
        </li>
      </ul>
    </nav>
  );
}

/* Pied de page commun */
function Footer() {
  return (
    <footer>
      Prototype académique fictif — Starbucks Coffee Club
    </footer>
  );
}

/* Page d’accueil */
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section
        className="hero"
        style={{ backgroundImage: "url('images/products/espresso-roast-dark-beans-display.png')" }}
      >
        <h1>Starbucks Coffee Club</h1>
        <p>
          Votre café Starbucks préféré, en capsules ou en grains, livré selon vos
          goûts, votre machine et votre rythme.
        </p>
        <div className="buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/quiz')}
          >
            Créer mon abonnement
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/formules')}
          >
            Découvrir les formules
          </button>
        </div>
      </section>
      <section className="container">
        <h2>Nos offres</h2>
        <div className="offers">
          <div className="offer-card">
            <h3>Capsules compatibles</h3>
            <p>
              Capsules Starbucks® compatibles Nespresso Original®, pour des
              expressos riches et variés.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/formules')}
            >
              Explorer
            </button>
          </div>
          <div className="offer-card">
            <h3>Café en grains</h3>
            <p>
              Savourez nos cafés en grains fraîchement torréfiés, à moudre chez
              vous selon vos envies.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/formules')}
            >
              Explorer
            </button>
          </div>
          <div className="offer-card">
            <h3>Coffee Duo</h3>
            <p>
              L’alliance parfaite : capsules et grains pour varier les plaisirs
              selon vos machines.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/formules')}
            >
              Explorer
            </button>
          </div>
        </div>
      </section>
      <section className="container">
        <h2>Les bénéfices du Coffee Club</h2>
        <div className="benefits">
          <div className="benefit">
            <i className="fas fa-sliders-h"></i>
            <h4>Personnalisation</h4>
            <p>Choisissez vos cafés selon vos goûts et votre matériel.</p>
          </div>
          <div className="benefit">
            <i className="fas fa-sync-alt"></i>
            <h4>Flexibilité</h4>
            <p>Modifiez ou mettez en pause votre abonnement à tout moment.</p>
          </div>
          <div className="benefit">
            <i className="fas fa-star"></i>
            <h4>Starbucks Rewards</h4>
            <p>Accumulez des étoiles et profitez de récompenses exclusives.</p>
          </div>
          <div className="benefit">
            <i className="fas fa-leaf"></i>
            <h4>Livraison responsable</h4>
            <p>Des emballages optimisés et un acheminement bas carbone.</p>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="how-it-works">
          <h2>Comment ça marche ?</h2>
          <div className="steps">
            <div className="step">
              <div className="number">1</div>
              <p>Je choisis ma machine et mes goûts.</p>
            </div>
            <div className="step">
              <div className="number">2</div>
              <p>Starbucks me recommande une formule.</p>
            </div>
            <div className="step">
              <div className="number">3</div>
              <p>Je reçois mon café.</p>
            </div>
            <div className="step">
              <div className="number">4</div>
              <p>Je modifie ou mets en pause mon abonnement à tout moment.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* Page du quiz interactif My Coffee Match */
function Quiz() {
  const navigate = useNavigate();
  // Questions et options prédéfinies
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

  const [current, setCurrent] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [showResult, setShowResult] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState(null);

  const totalQuestions = questions.length;
  const progress = ((current) / totalQuestions) * 100;

  function handleSelect(option) {
    const id = questions[current].id;
    setAnswers({ ...answers, [id]: option });
  }

  function next() {
    if (current < totalQuestions - 1) {
      setCurrent(current + 1);
    } else {
      // Calcul de la recommandation
      const rec = computeRecommendation(answers);
      setRecommendation(rec);
      setShowResult(true);
    }
  }

  function back() {
    if (current > 0) setCurrent(current - 1);
  }

  // Déterminer la recommandation en fonction des réponses
  function computeRecommendation(a) {
    let product = [];
    // Intensité
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
      default:
        break;
    }
    // Goût
    if (a.taste === 'Café gourmand') {
      product.push('Vanille', 'Caramel', 'Chocolate Hazelnut');
    } else if (a.taste === 'Décaféiné') {
      product.push('Décaféiné');
    } else if (a.taste === 'Découverte') {
      product.push('Sélection découverte');
    } else {
      product.push('House Blend');
    }
    // Format
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

  if (showResult) {
    return (
      <section className="container" style={{ paddingTop: '80px' }}>
        <div className="quiz">
          <h2>Votre recommandation</h2>
          <p>Nous avons créé une sélection adaptée à vos habitudes.</p>
          <p>
            <strong>Formule suggérée :</strong> {recommendation.plan}
          </p>
          <p>
            <strong>Cafés recommandés :</strong>{' '}
            {recommendation.coffees.join(', ')}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/formules')}
          >
            Choisir une formule
          </button>
        </div>
      </section>
    );
  }

  // Rendu de la question actuelle
  const q = questions[current];
  return (
    <section className="container" style={{ paddingTop: '80px' }}>
      <div className="quiz">
        <div className="progress-bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>
        <div className="question">
          <h3>
            {current + 1}. {q.question}
          </h3>
          <div className="options">
            {q.options.map((opt) => {
              const selected = answers[q.id] === opt;
              return (
                <label
                  key={opt}
                  className={`option${selected ? ' selected' : ''}`}
                  onClick={() => handleSelect(opt)}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={selected}
                    onChange={() => handleSelect(opt)}
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        </div>
        <div className="navigation-buttons">
          <button
            className="btn btn-secondary"
            onClick={back}
            disabled={current === 0}
          >
            Précédent
          </button>
          <button
            className="btn btn-primary"
            onClick={next}
            disabled={!answers[q.id]}
          >
            {current === totalQuestions - 1 ? 'Terminer' : 'Suivant'}
          </button>
        </div>
      </div>
    </section>
  );
}

/* Page des formules */
function Formulas() {
  const navigate = useNavigate();
  const { setSubscription } = React.useContext(AppContext);
  // Liste des formules proposées
  const formulas = [
    {
      id: 'flex_capsules',
      name: 'Coffee Flex Capsules',
      content: '30 capsules',
      price: 11.49,
      description: 'Idéal pour les petites consommations.',
      advantages: ['Personnalisation', 'Sans engagement'],
      target: '1 tasse/jour',
      type: 'capsules',
      recommended: false,
    },
    {
      id: 'daily_capsules',
      name: 'Daily Capsules',
      content: '60 capsules',
      price: 22.49,
      description: 'Pour les amateurs quotidiens.',
      advantages: ['Double choix', 'Livraison rapide'],
      target: '2 tasses/jour',
      type: 'capsules',
      recommended: false,
    },
    {
      id: 'coffee_lover',
      name: 'Coffee Lover Capsules',
      content: '100 capsules',
      price: 36.99,
      description: 'Pour les familles et les grands buveurs.',
      advantages: ['Sélection généreuse', 'Réductions progressives'],
      target: '3+ tasses/jour',
      type: 'capsules',
      recommended: false,
    },
    {
      id: 'coffee_grains',
      name: 'Coffee Grains',
      content: '2 sachets de 450 g',
      price: 21.99,
      description: 'Pour les machines à grains.',
      advantages: ['Fraîchement torréfié', 'Colombie, Espresso, Blonde'],
      target: 'Amateurs de grains',
      type: 'grains',
      recommended: false,
    },
    {
      id: 'coffee_duo',
      name: 'Coffee Duo',
      content: '30 capsules + 1 sachet de 450 g',
      price: 22.99,
      description: 'Le meilleur des deux mondes !',
      advantages: ['Capsules + grains', 'Flexibilité totale'],
      target: 'Mixte',
      type: 'duo',
      recommended: true,
    },
    {
      id: 'discovery',
      name: 'Discovery Box',
      content: 'Sélection découverte',
      price: 16.49,
      description: 'Une surprise à chaque livraison.',
      advantages: ['Éditions limitées', 'Découverte gustative'],
      target: 'Curieux',
      type: 'mix',
      recommended: false,
    },
    {
      id: 'office',
      name: 'Office Coffee',
      content: 'Offre entreprise',
      price: 0,
      description: 'Solution pour les professionnels.',
      advantages: ['Facturation simplifiée', 'Gestionnaire dédié'],
      target: 'Entreprises',
      type: 'entreprise',
      recommended: false,
    },
  ];

  // Options génériques
  const frequencies = ['Toutes les 4 semaines', 'Toutes les 6 semaines', 'Toutes les 8 semaines'];
  const deliveryModes = ['Domicile', 'Point relais'];

  // Gère la sélection et la personnalisation pour chaque formule dans un état local
  const [custom, setCustom] = React.useState(() => {
    const obj = {};
    formulas.forEach((f) => {
      obj[f.id] = {
        frequency: frequencies[0],
        delivery: deliveryModes[0],
        quantity: 1,
        coffeeType: f.type,
      };
    });
    return obj;
  });

  function handleChange(formulaId, field, value) {
    setCustom({
      ...custom,
      [formulaId]: { ...custom[formulaId], [field]: value },
    });
  }

  function chooseFormula(formula) {
    const options = custom[formula.id];
    setSubscription({ plan: formula, options, coffees: [] });
    navigate('/panier');
  }

  return (
    <section className="container" style={{ paddingTop: '80px' }}>
      <h2>Nos formules</h2>
      <div className="offers">
        {formulas.map((f) => (
          <div
            key={f.id}
            className={`offer-card${f.recommended ? ' recommended' : ''}`}
          >
            <h3>{f.name}</h3>
            <p>{f.description}</p>
            <p className="price">
              {f.price > 0 ? `${f.price.toFixed(2)} € / mois` : 'Sur devis'}
            </p>
            <div className="controls">
              {f.id !== 'office' && (
                <>
                  <label>
                    Type de café :
                    <select
                      value={custom[f.id].coffeeType}
                      onChange={(e) => handleChange(f.id, 'coffeeType', e.target.value)}
                    >
                      {['capsules', 'grains', 'duo'].includes(f.type) ? (
                        // Le type initial est figé mais on peut permettre un choix supplémentaire pour la découverte
                        <>
                          {f.type === 'capsules' && (
                            <>
                              <option value="capsules">Capsules</option>
                            </>
                          )}
                          {f.type === 'grains' && <option value="grains">Grains</option>}
                          {f.type === 'duo' && (
                            <>
                              <option value="duo">Capsules + grains</option>
                            </>
                          )}
                          {f.type === 'mix' && (
                            <>
                              <option value="mix">Capsules ou grains</option>
                            </>
                          )}
                        </>
                      ) : null}
                    </select>
                  </label>
                  <label>
                    Fréquence :
                    <select
                      value={custom[f.id].frequency}
                      onChange={(e) => handleChange(f.id, 'frequency', e.target.value)}
                    >
                      {frequencies.map((freq) => (
                        <option key={freq} value={freq}>
                          {freq}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Mode de livraison :
                    <select
                      value={custom[f.id].delivery}
                      onChange={(e) => handleChange(f.id, 'delivery', e.target.value)}
                    >
                      {deliveryModes.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Quantité :
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={custom[f.id].quantity}
                      onChange={(e) => handleChange(f.id, 'quantity', parseInt(e.target.value))}
                    />
                  </label>
                </>
              )}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => chooseFormula(f)}
            >
              Choisir cette formule
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Page panier et confirmation */
function Cart() {
  const { subscription, user, setUser } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = React.useState(false);

  if (!subscription || !subscription.plan) {
    return (
      <section className="container" style={{ paddingTop: '80px', textAlign: 'center' }}>
        <p>Aucune formule sélectionnée. Rendez-vous sur la page des formules.</p>
        <button className="btn btn-primary" onClick={() => navigate('/formules')}>
          Nos formules
        </button>
      </section>
    );
  }

  const { plan, options } = subscription;
  const totalPrice = plan.price * (options.quantity || 1);
  const rewardsBonus = Math.round(totalPrice * 2); // étoile bonus simulée

  function handleConfirm() {
    setConfirmed(true);
    // créditer des étoiles supplémentaires
    setUser({ ...user, stars: user.stars + rewardsBonus });
  }

  return (
    <section className="container" style={{ paddingTop: '80px' }}>
      <div className="cart">
        {!confirmed ? (
          <>
            <h2>Récapitulatif de votre abonnement</h2>
            <div className="summary">
              <div className="summary-item">
                <span>Formule</span>
                <span className="value">{plan.name}</span>
              </div>
              <div className="summary-item">
                <span>Contenu</span>
                <span className="value">{plan.content}</span>
              </div>
              <div className="summary-item">
                <span>Fréquence</span>
                <span className="value">{options.frequency}</span>
              </div>
              <div className="summary-item">
                <span>Mode de livraison</span>
                <span className="value">{options.delivery}</span>
              </div>
              <div className="summary-item">
                <span>Quantité</span>
                <span className="value">{options.quantity}</span>
              </div>
              <div className="summary-item">
                <span>Prix</span>
                <span className="value">{totalPrice.toFixed(2)} € / mois</span>
              </div>
              <div className="summary-item">
                <span>Bonus Rewards</span>
                <span className="value">{rewardsBonus} ☆</span>
              </div>
            </div>
            <div className="confirm">
              <button className="btn btn-primary" onClick={handleConfirm}>
                Confirmer mon abonnement
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Félicitations !</h2>
            <p>Votre Starbucks Coffee Club est activé.</p>
            <p>Votre première livraison est prévue le 24 mai 2026.</p>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Accéder à mon espace client
            </button>
          </>
        )}
      </div>
    </section>
  );
}

/* Composant modale générique */
function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
        <button className="btn btn-primary" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}

/* Page du tableau de bord client */
function Dashboard() {
  const { subscription, setSubscription, user, setUser } = React.useContext(AppContext);
  const [modalContent, setModalContent] = React.useState(null);
  const navigate = useNavigate();

  // Calcul du niveau de fidélité basé sur le nombre d’étoiles
  function getFidelityLevel(stars) {
    if (stars >= 300) return 'Or';
    if (stars >= 150) return 'Argent';
    return 'Bronze';
  }

  function handlePause() {
    setModalContent(
      <div>
        <p>Votre abonnement a été mis en pause. Vous pouvez le réactiver à tout moment.</p>
      </div>
    );
  }

  function handleDelay() {
    setModalContent(
      <div>
        <p>Votre prochaine livraison a été reportée d’une semaine (simulation).</p>
      </div>
    );
  }

  function handleAddVariety() {
    const available = ['Colombia', 'Espresso Roast', 'House Blend', 'Vanille', 'Caramel'];
    const [selected, setSelected] = React.useState([]);
    const toggle = (c) => {
      setSelected((prev) => {
        if (prev.includes(c)) return prev.filter((x) => x !== c);
        return [...prev, c];
      });
    };
    const confirm = () => {
      setSubscription({ ...subscription, coffees: selected });
      setModalContent(
        <div>
          <p>Variétés ajoutées : {selected.join(', ') || 'Aucune'}.</p>
        </div>
      );
    };
    setModalContent(
      <div>
        <p>Sélectionnez les cafés à ajouter :</p>
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
          {available.map((c) => (
            <li key={c} style={{ marginBottom: 8 }}>
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  onChange={() => toggle(c)}
                  style={{ marginRight: 8 }}
                />
                {c}
              </label>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={confirm}>
          Valider
        </button>
      </div>
    );
  }

  function handleChangeAddress() {
    setModalContent(
      <div>
        <p>Votre adresse a été modifiée (simulation).</p>
      </div>
    );
  }

  function handleCancel() {
    setModalContent(
      <div>
        <p>Votre abonnement a été résilié (simulation).</p>
      </div>
    );
    // supprimer l’abonnement
    setSubscription({ plan: null, options: {}, coffees: [] });
  }

  return (
    <section className="container" style={{ paddingTop: '80px' }}>
      <div className="dashboard">
        <h2>Bonjour {user.name}</h2>
        <div className="dashboard-card">
          <h3>Mon abonnement</h3>
          {subscription && subscription.plan ? (
            <>
              <p>
                <strong>Formule actuelle :</strong> {subscription.plan.name}
              </p>
              <p>
                <strong>Prochaine livraison :</strong> ${getNextDeliveryDate(14)}
              </p>
              <p>
                <strong>Cafés sélectionnés :</strong>{' '}
                {subscription.coffees.length > 0
                  ? subscription.coffees.join(', ')
                  : 'House Blend, Colombia et Espresso Roast'}
              </p>
              <p>
                <strong>Livraison :</strong> {subscription.options.delivery || 'Domicile'}
              </p>
            </>
          ) : (
            <p>Aucun abonnement en cours.</p>
          )}
        </div>
        <div className="dashboard-card">
          <h3>Starbucks Rewards</h3>
          <p>
            <strong>Étoiles accumulées :</strong> {user.stars} ☆
          </p>
          <p>
            <strong>Niveau de fidélité :</strong> {getFidelityLevel(user.stars)}
          </p>
        </div>
        <div className="dashboard-card">
          <h3>Historique des commandes</h3>
          <ul className="history-list">
            {user.history.map((item, idx) => (
              <li key={idx}>
                {item.date} : {item.items}
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-card">
          <h3>Actions</h3>
          <div className="actions">
            <button onClick={() => navigate('/formules')}>Modifier mon abonnement</button>
            <button onClick={handlePause}>Mettre en pause</button>
            <button onClick={handleDelay}>Reporter ma livraison</button>
            <button onClick={handleAddVariety}>Ajouter une variété</button>
            <button onClick={handleChangeAddress}>Changer mon adresse</button>
            <button onClick={handleCancel}>Résilier mon abonnement</button>
          </div>
        </div>
      </div>
      {modalContent && (
        <Modal title="Information" onClose={() => setModalContent(null)}>
          {modalContent}
        </Modal>
      )}
    </section>
  );
}

/* Page Rewards */
function Rewards() {
  const { user } = React.useContext(AppContext);
  const nextThreshold = 150;
  const progress = Math.min((user.stars / nextThreshold) * 100, 100);
  return (
    <section className="container" style={{ paddingTop: '80px' }}>
      <div className="rewards">
        <h2>Votre café vous récompense</h2>
        <div className="reward-card">
          <h3>Accumulez des étoiles</h3>
          <p>Vous gagnez des étoiles à chaque commande Starbucks Coffee Club.</p>
          <p>
            Bonus de bienvenue et bonus après trois livraisons pour vous aider à
            atteindre des récompenses plus rapidement !
          </p>
          <div className="reward-progress">
            <div style={{ width: `${progress}%` }}></div>
          </div>
          <p>
            {user.stars} ☆ / {nextThreshold} ☆ — prochaine récompense à {nextThreshold} ☆
          </p>
        </div>
        <div className="reward-card">
          <h3>Avantages</h3>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
            <li>• Bonus de bienvenue</li>
            <li>• Bonus après trois livraisons</li>
            <li>• Accès anticipé aux éditions limitées</li>
            <li>• Offres personnalisées dans les salons Starbucks</li>
            <li>• Récompenses utilisables dans les Starbucks participants</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Page RSE et Refill */
function RsePage() {
  const [showRefill, setShowRefill] = React.useState(false);
  return (
    <section className="container" style={{ paddingTop: '80px' }}>
      <div className="rse-page">
        <h2>Un café plus responsable, à chaque livraison</h2>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
          <li>• QR code de tri sur les emballages</li>
          <li>• Réduction du suremballage et livraisons regroupées</li>
          <li>• Livraison en point relais pour réduire l’empreinte carbone</li>
          <li>• Café en grains avec emballages optimisés pour la conservation</li>
          <li>• Informations sur la conservation des grains</li>
          <li>• Recyclage des capsules</li>
          <li>• Livraison bas carbone selon les zones</li>
        </ul>
        <div>
          <h2>Starbucks Coffee Club Refill</h2>
          <p>
            À partir de la deuxième année, Starbucks Coffee Club testera un
            service de recharge de café en grains dans quelques salons
            pilotes. Le client pourra commander son café via l’application,
            venir avec son contenant réutilisable et récupérer sa recharge
            dans un salon participant.
          </p>
          <div className="actions">
            {!showRefill ? (
              <button
                className="btn btn-primary"
                onClick={() => setShowRefill(true)}
              >
                Découvrir le fonctionnement de Refill
              </button>
            ) : (
              <></>
            )}
          </div>
          {showRefill && (
            <div className="refill-steps">
              <div className="refill-step">
                <h4>1. Choisissez votre café en grains</h4>
                <p>Sélectionnez votre variété préférée depuis l’application.</p>
              </div>
              <div className="refill-step">
                <h4>2. Sélectionnez un salon participant</h4>
                <p>Trouvez un salon près de chez vous prêt à vous accueillir.</p>
              </div>
              <div className="refill-step">
                <h4>3. Apportez votre contenant</h4>
                <p>Munissez-vous de votre bocal ou sachet réutilisable.</p>
              </div>
              <div className="refill-step">
                <h4>4. Récupérez votre recharge</h4>
                <p>Votre café est servi, prêt à être dégusté à la maison.</p>
              </div>
              <div className="refill-step">
                <h4>5. Gagnez un bonus fidélité</h4>
                <p>Recevez des étoiles supplémentaires pour vos démarches responsables.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* Page offre entreprise */
function OfficePage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    nom: '',
    societe: '',
    email: '',
    volume: '',
    message: '',
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  return (
    <section className="container" style={{ paddingTop: '80px' }}>
      <div className="office-page">
        <h2>Office Coffee</h2>
        <p>
          Une solution café premium pour les TPE, PME, agences, cabinets et
          espaces de coworking.
        </p>
        <div className="office-features">
          <div className="office-feature">
            <i className="fas fa-box"></i>
            <h4>Capsules, grains ou mix</h4>
            <p>Choisissez le format qui convient le mieux à vos équipes.</p>
          </div>
          <div className="office-feature">
            <i className="fas fa-clock"></i>
            <h4>Livraison planifiée</h4>
            <p>Recevez vos cafés selon un calendrier adapté à votre activité.</p>
          </div>
          <div className="office-feature">
            <i className="fas fa-file-invoice"></i>
            <h4>Facturation simplifiée</h4>
            <p>Une facture claire et unique pour toute votre consommation.</p>
          </div>
          <div className="office-feature">
            <i className="fas fa-user-tie"></i>
            <h4>Gestionnaire dédié</h4>
            <p>Un expert pour vous accompagner et optimiser votre offre.</p>
          </div>
          <div className="office-feature">
            <i className="fas fa-chart-line"></i>
            <h4>Suivi de consommation</h4>
            <p>Visualisez vos statistiques de consommation en temps réel.</p>
          </div>
          <div className="office-feature">
            <i className="fas fa-recycle"></i>
            <h4>Tri et recyclage</h4>
            <p>Nous vous accompagnons dans le tri et le recyclage des emballages.</p>
          </div>
        </div>
        <h3>Demande de devis</h3>
        <div className="office-form">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <label>
                Nom complet
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Société / Organisation
                <input
                  type="text"
                  name="societe"
                  value={form.societe}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                E‑mail professionnel
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Volume mensuel estimé (kg ou nombre de capsules)
                <input
                  type="text"
                  name="volume"
                  value={form.volume}
                  onChange={handleChange}
                />
              </label>
              <label>
                Message / Besoins spécifiques
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
              </label>
              <button type="submit" className="btn btn-primary">
                Envoyer ma demande
              </button>
            </form>
          ) : (
            <p>
              Merci pour votre demande. Notre équipe vous contactera très prochainement
              pour établir un devis personnalisé.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// Point d’entrée : rendu de l’application
ReactDOM.createRoot(document.getElementById('root')).render(<App />);