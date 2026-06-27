document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Dark/Light Theme Toggle
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ==========================================
  // 2. Mouse Parallax Background Blobs
  // ==========================================
  const blob1 = document.getElementById('blob1');
  const blob2 = document.getElementById('blob2');
  
  let targetX1 = -100, targetY1 = -100;
  let targetX2 = window.innerWidth - 400, targetY2 = window.innerHeight - 400;
  let currentX1 = -100, currentY1 = -100;
  let currentX2 = targetX2, currentY2 = targetY2;

  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Parallax logic: slightly offset target positions based on mouse position
    targetX1 = -100 + (mouseX * 0.05);
    targetY1 = -100 + (mouseY * 0.05);
    
    targetX2 = (window.innerWidth - 400) - (mouseX * 0.05);
    targetY2 = (window.innerHeight - 400) - (mouseY * 0.05);
  });

  // Smooth lerp for blobs
  function animateBlobs() {
    currentX1 += (targetX1 - currentX1) * 0.1;
    currentY1 += (targetY1 - currentY1) * 0.1;
    
    currentX2 += (targetX2 - currentX2) * 0.1;
    currentY2 += (targetY2 - currentY2) * 0.1;
    
    if (blob1) blob1.style.transform = `translate(${currentX1}px, ${currentY1}px)`;
    if (blob2) blob2.style.transform = `translate(${currentX2 - (window.innerWidth - 500)}px, ${currentY2 - (window.innerHeight - 500)}px)`;
    
    requestAnimationFrame(animateBlobs);
  }
  animateBlobs();

  // ==========================================
  // 3. Typing Animation (Hero Section)
  // ==========================================
  const typingText = document.getElementById('typingText');
  const phrases = [
    "사용자 관점에서 코드를 작성합니다.",
    "빠른 기술 학습과 성장을 즐깁니다.",
    "기술은 사람을 위해 존재한다고 믿습니다.",
    "소통하고 협업하는 과정을 소중히 합니다."
  ];
  
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;
      typingSpeed = 50; // Delete faster
    } else {
      typingText.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;
      typingSpeed = 100; // Type normally
    }
    
    if (!isDeleting && characterIndex === currentPhrase.length) {
      // Pause at the end of phrase
      isDeleting = true;
      typingSpeed = 2000; 
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next phrase
    }
    
    setTimeout(type, typingSpeed);
  }
  
  if (typingText) {
    type();
  }

  // ==========================================
  // 4. Scroll Reveal (Fade-in on scroll)
  // ==========================================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 5. Interactive Roadmap Toggle
  // ==========================================
  const roadmapBtns = document.querySelectorAll('.roadmap-btn');
  const roadmapDisplay = document.getElementById('roadmapDisplay');
  
  const roadmapData = {
    short: {
      icon: "🚀",
      title: "성실한 적응과 비즈니스 도메인 학습",
      desc: "입사 직후 개발 컨벤션 및 기술 스택에 신속하게 적응하는 것을 최우선 목표로 삼겠습니다. 팀원과의 신뢰를 다지며 담당 비즈니스의 도메인을 이해하고 개발 완성도를 높여가겠습니다.",
      checklist: [
        "회사 개발 컨벤션 및 업무 프로세스 파악",
        "도메인 비즈니스 구조와 아키텍처 습득",
        "1인분 이상의 개발 몫 달성 및 버그 제로 지향"
      ]
    },
    mid: {
      icon: "🛡️",
      title: "기술 전문성 확보 및 아키텍처 기여",
      desc: "클라우드 기술과 마이크로서비스 아키텍처(MSA)에 대한 지식을 고도화하여 대규모 트래픽 확장을 고려한 안정적인 설계에 기여하겠습니다. 주니어 개발자를 이끌며 팀에 긍정적인 영향을 줍니다.",
      checklist: [
        "클라우드 서비스 인프라 운용 실전 도입",
        "마이크로서비스 아키텍처(MSA) 설계 참여",
        "신규 프레임워크 검토 및 코드 리뷰 적극 리드"
      ]
    },
    long: {
      icon: "✨",
      title: "혁신을 주도하는 핵심 리더",
      desc: "회사와 온전히 소통하며 제품과 비즈니스의 미래 성장을 주도하는 테크 리더로 발돋움하겠습니다. '사람을 향한 기술'을 구현해 고객의 만족을 최고치로 끌어올리는 플랫폼 개발의 핵심이 되겠습니다.",
      checklist: [
        "확장성 높은 글로벌 아키텍처 고도화 주도",
        "사용자 관점의 가치를 비즈니스 성과로 실현",
        "IT 지식을 활발하게 공유하는 사내외 테크 멘토 활동"
      ]
    }
  };

  roadmapBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Manage active state classes
      roadmapBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const step = btn.getAttribute('data-step');
      const data = roadmapData[step];
      
      if (data && roadmapDisplay) {
        // Apply smooth transition effect
        roadmapDisplay.style.opacity = '0';
        roadmapDisplay.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          // Generate checklist HTML
          const checklistHtml = data.checklist.map(item => `<li>${item}</li>`).join('');
          
          roadmapDisplay.innerHTML = `
            <div class="roadmap-details">
              <div class="roadmap-icon-wrap">${data.icon}</div>
              <div class="roadmap-text-wrap">
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
                <ul class="roadmap-checklist">
                  ${checklistHtml}
                </ul>
              </div>
            </div>
          `;
          
          roadmapDisplay.style.opacity = '1';
          roadmapDisplay.style.transform = 'translateY(0)';
        }, 200);
      }
    });
  });

  // ==========================================
  // 6. Contact Form Demo Handler
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('userName').value;
      const email = document.getElementById('userEmail').value;
      const msg = document.getElementById('userMsg').value;
      
      // Basic simulation of sending form
      if (name && email && msg) {
        formFeedback.textContent = `감사합니다, ${name}님! 소중한 의견이 전송되었습니다. (작동 데모)`;
        formFeedback.className = "form-feedback success";
        formFeedback.classList.remove('hidden');
        
        // Reset form
        contactForm.reset();
        
        // Auto hide message after 5 seconds
        setTimeout(() => {
          formFeedback.classList.add('hidden');
        }, 5000);
      } else {
        formFeedback.textContent = "모든 항목을 입력해주세요.";
        formFeedback.className = "form-feedback error";
        formFeedback.classList.remove('hidden');
      }
    });
  }
});
