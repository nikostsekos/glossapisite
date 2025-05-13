// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// Main initialization 
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing page');
  
  // Initialize background animation
  initBackgroundAnimation();
  
  // Animate hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    // Initial animation
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 100);
  }

  // Initialize terminal animation
  initTerminal();
  
  // Initialize expandable team member cards
  initTeamMemberCards();
});

// Very simple background animation with large floating elements
function initBackgroundAnimation() {
  console.log('Starting background animation setup');
  const backgroundElement = document.getElementById('background-animation');
  
  if (!backgroundElement) {
    console.error('Background element not found!');
    return;
  }
  
  console.log('Background element found, adding animated circles');
  
  // Create an enhanced mix of shapes for a more vibrant, multi-directional effect
  const shapeTypes = ['circle', 'bar', 'dot'];
  const totalShapes = 28; // Significantly more elements for a more vibrant background
  
  for (let i = 0; i < totalShapes; i++) {
    const shape = document.createElement('div');
    const shapeType = shapeTypes[i % shapeTypes.length];
    shape.className = `animated-shape ${shapeType}`;
    shape.style.position = 'absolute';
    
    // More vibrant colors for each type of shape - now with blur effect
    if (shapeType === 'circle') {
      // More vibrant orange color for circles
      shape.style.backgroundColor = 'rgba(249, 115, 22, 0.45)';
      // Add blur effect
      shape.style.filter = 'blur(8px)';
    } else if (shapeType === 'bar') {
      // More vibrant darker orange for bars
      shape.style.backgroundColor = 'rgba(234, 88, 12, 0.42)';
      // Add blur effect
      shape.style.filter = 'blur(6px)';
    } else { // dots
      // More vibrant lighter orange for dots
      shape.style.backgroundColor = 'rgba(251, 146, 60, 0.48)';
      // Add blur effect
      shape.style.filter = 'blur(5px)';
    }
    
    // Vary appearance based on shape type
    if (shapeType === 'circle') {
      shape.style.borderRadius = '50%';
      // Slightly larger circles
      const size = 45 + (i % 4) * 25;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      // Enhanced glow for circles
      shape.style.boxShadow = '0 0 25px rgba(249, 115, 22, 0.35)';
    } else if (shapeType === 'bar') {
      // Thin horizontal or vertical bars
      const isVertical = i % 2 === 0;
      const length = 75 + (i % 5) * 35;
      const thickness = 2 + (i % 3);
      
      if (isVertical) {
        shape.style.width = `${thickness}px`;
        shape.style.height = `${length}px`;
      } else {
        shape.style.width = `${length}px`;
        shape.style.height = `${thickness}px`;
      }
      shape.style.borderRadius = '4px';
      // Enhanced glow for bars
      shape.style.boxShadow = '0 0 18px rgba(234, 88, 12, 0.32)';
    } else { // dots
      shape.style.borderRadius = '50%';
      const size = 4 + (i % 5) * 3; // Slightly larger dots
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.boxShadow = '0 0 15px rgba(251, 146, 60, 0.38)';
    }
    
    // Position more sparsely across the screen
    const posX = Math.random() * 90 + 5; // 5% to 95% of screen width
    const posY = Math.random() * 90 + 5; // 5% to 95% of screen height
    shape.style.left = `${posX}%`;
    shape.style.top = `${posY}%`;
    
    // Add animations with slower, smoother durations
    // Using cubic-bezier for smoother transitions
    if (shapeType === 'circle') {
      // Slower animation for circles (10-16s)
      shape.style.animation = `floatingcircle ${10 + i % 7}s infinite cubic-bezier(0.4, 0, 0.2, 1) alternate`;
    } else if (shapeType === 'bar') {
      // Slower animation for bars (12-18s)
      shape.style.animation = `floatingbar ${12 + i % 7}s infinite cubic-bezier(0.4, 0, 0.2, 1) alternate`;
    } else { // dots
      // Slower animation for dots (8-14s)
      shape.style.animation = `floatingdot ${8 + i % 7}s infinite cubic-bezier(0.4, 0, 0.2, 1) alternate`;
    }
    shape.style.animationDelay = `${i * 1.2}s`;
    
    // Add to background
    backgroundElement.appendChild(shape);
  }
  
  // Add scroll event listener for animation on scroll
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  console.log('Background animation initialized');
}

// Handle scroll events with more dramatic movement response
function handleScroll() {
  // Get scroll percentage (0 to 1)
  const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  
  // Apply transition to elements for responsive but smooth movement
  document.querySelectorAll('.animated-shape').forEach((shape, index) => {
    // Smoother, more fluid transitions when scrolling
    shape.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)';
    
    // Different movement for different shapes
    const isCircle = shape.classList.contains('circle');
    const isBar = shape.classList.contains('bar');
    const isDot = shape.classList.contains('dot');
    
    // Add a subtle multiplier based on scroll direction for smoother movement
    const scrollDirection = getScrollDirection();
    const directionMultiplier = scrollDirection === 'down' ? 1.2 : 0.9;
    
    if (isCircle) {
      // Circles move smoothly with scroll
      const moveY = scrollPercentage * -90 * directionMultiplier; // Moderate vertical movement
      const moveX = scrollPercentage * (index % 2 ? 45 : -45) * directionMultiplier; // Gentle horizontal movement
      const rotate = scrollPercentage * (index % 2 ? 5 : -5); // Subtle rotation
      const scale = 1 + scrollPercentage * 0.15; // Gentle scaling
      
      shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${scale})`;
    } else if (isBar) {
      // Bars shift and rotate with a smooth, gentle motion
      const moveY = scrollPercentage * (index % 2 ? -60 : 60) * directionMultiplier;
      const moveX = scrollPercentage * (index % 3 ? 30 : -30) * directionMultiplier;
      const rotate = scrollPercentage * (index % 2 ? 8 : -8); // Subtle rotation
      
      shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
    } else if (isDot) {
      // Dots follow gentle, fluid paths when scrolling
      const angle = index * 0.5 + (scrollPercentage * Math.PI * 0.7); // Angle changes more gradually
      const radius = (30 + (index % 4) * 10) * directionMultiplier; // Smaller, more consistent radius
      const moveX = scrollPercentage * radius * Math.cos(angle);
      const moveY = scrollPercentage * radius * Math.sin(angle) * directionMultiplier;
      const scale = 1 + scrollPercentage * 0.2; // Gentle scaling
      
      shape.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
    }
  });
}

// Track scroll direction for more responsive animations
let lastScrollTop = 0;
function getScrollDirection() {
  const st = window.scrollY;
  const direction = (st > lastScrollTop) ? 'down' : 'up';
  lastScrollTop = st;
  return direction;
}

// Terminal animation initialization
function initTerminal() {
  const terminal = document.getElementById('terminal');
  const typedCommand = document.getElementById('typed-command');
  const outputContainer = document.getElementById('terminal-output-container');
  const copyCommand = document.getElementById('copy-command');
  const commandText = 'pip install glossapi';
  
  // Simplified pip install output messages with slower timings
  const pipMessages = [
    { text: 'Collecting glossapi', type: 'normal', delay: 1200 },
    // The downloading message will be handled by the real progress bar
    { text: 'Successfully installed glossapi-1.0.0', type: 'success', delay: 1500 },
  ];
  
  // Function to simulate typing with slower speed
  function typeWriter(text, element, i = 0, speed = 120) {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(() => typeWriter(text, element, i, speed), speed);
      
      // Start pip output animation after typing is complete
      if (i === text.length) {
        setTimeout(() => {
          showPipOutput();
        }, 800);
      }
    }
  }
  
  // Function to add a terminal output line
  function addOutputLine(text, type = 'normal') {
    const line = document.createElement('div');
    line.className = `terminal-output-line ${type}`;
    line.textContent = text;
    outputContainer.appendChild(line);
    
    // Auto-scroll to the bottom
    const terminalContent = document.querySelector('.terminal-content');
    terminalContent.scrollTop = terminalContent.scrollHeight;
    
    return line;
  }
  
  // Function to animate the progress bar
  function animateProgressBar() {
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');
    const progressStats = document.getElementById('progress-stats');
    const progressSpeed = document.getElementById('progress-speed');
    
    // Show the progress container
    progressContainer.style.display = 'block';
    
    // Total file size in KB
    const totalSize = 58.3;
    let currentSize = 0;
    let progress = 0;
    
    // Random speeds between 1.8 and 3.2 MB/s
    const getRandomSpeed = () => (Math.random() * 1.4 + 1.8).toFixed(1);
    
    // Update progress every 50ms
    const progressInterval = setInterval(() => {
      // Generate random increment (make download appear realistic with variable speeds)
      let increment = Math.random() * 3 + 1;
      
      // Slow down at the end to make it look more realistic
      if (progress > 85) {
        increment = Math.random() * 1.5 + 0.5;
      }
      
      progress += increment;
      currentSize = (progress / 100) * totalSize;
      
      // Update the progress bar width
      if (progress >= 100) {
        progress = 100;
        currentSize = totalSize;
        clearInterval(progressInterval);
        
        // Continue with next message after download completes
        setTimeout(() => {
          // Hide the progress bar
          progressContainer.style.display = 'none';
          
          // Show success message
          setTimeout(() => {
            addOutputLine(pipMessages[1].text, pipMessages[1].type);
          }, 800);
        }, 500);
      }
      
      // Update UI elements
      progressBar.style.width = `${progress}%`;
      progressPercentage.textContent = `${Math.round(progress)}%`;
      progressStats.textContent = `${currentSize.toFixed(1)}/${totalSize} kB`;
      progressSpeed.textContent = `${getRandomSpeed()} MB/s`;
      
    }, 50); // Update every 50ms for smooth animation
  }
  
  // Function to simulate pip install output
  function showPipOutput() {
    // Show first message: Collecting glossapi
    addOutputLine(pipMessages[0].text, pipMessages[0].type);
    
    // After a delay, show the download message and start progress bar
    setTimeout(() => {
      // Add the 'downloading' line
      addOutputLine('  Downloading glossapi-1.0.0.tar.gz (58 kB)', 'normal');
      
      // Start progress bar animation
      setTimeout(() => {
        animateProgressBar();
      }, 300);
    }, pipMessages[0].delay);
  }
  
  // Add cursor animation to the typed command
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  if (typedCommand) {
    typedCommand.parentNode.insertBefore(cursor, typedCommand.nextSibling);
  }
  
  // Auto-start the terminal animation with a delay when the page loads
  if (terminal && typedCommand) {
    // Reset command text
    typedCommand.textContent = '';
    
    // Add a delay before showing the terminal
    setTimeout(() => {
      // Initialize the terminal after delay
      terminal.classList.add('show');
      
      // Start typing after the terminal appears
      setTimeout(() => {
        typeWriter(commandText, typedCommand);
      }, 1800);
    }, 1200); // Wait 1.2 seconds before showing terminal
  }
  
  // Copy to clipboard functionality with visual feedback
  if (copyCommand) {
    copyCommand.addEventListener('click', () => {
      navigator.clipboard.writeText(commandText)
        .then(() => {
          // Visual feedback when copied with smooth transition
          const originalText = copyCommand.textContent;
          
          // Just add the class for smooth transition (background color is handled by CSS)
          copyCommand.classList.add('copy-success');
          copyCommand.textContent = 'Copied! ✓';
          
          // Reset after 2 seconds with smooth transition
          setTimeout(() => {
            copyCommand.textContent = originalText;
            copyCommand.classList.remove('copy-success');
          }, 2000);
          
          console.log('Command copied to clipboard');
        })
        .catch(err => {
          // Visual feedback for error
          copyCommand.textContent = 'Failed to copy';
          setTimeout(() => {
            copyCommand.textContent = 'Copy to Clipboard';
          }, 2000);
          console.error('Could not copy command: ', err);
          console.error('Could not copy text: ', err);
        });
    });
  }
}

// Handle expandable team member card functionality
function initTeamMemberCards() {
  const teamMembers = document.querySelectorAll('.team-member');
  
  teamMembers.forEach(member => {
    // Add click event to toggle expanded state
    member.addEventListener('click', function(event) {
      // Don't toggle if clicking on the CV link
      if (event.target.classList.contains('team-member-cv')) {
        event.stopPropagation();
        return;
      }
      
      // If this member is already active, collapse it
      if (this.classList.contains('active')) {
        this.classList.remove('active');
      } else {
        // First collapse any currently expanded member
        const currentActive = document.querySelector('.team-member.active');
        if (currentActive) {
          currentActive.classList.remove('active');
        }
        
        // Then expand this member
        this.classList.add('active');
        
        // Smooth scroll to ensure expanded card is visible
        const rect = this.getBoundingClientRect();
        const isPartiallyVisible = (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        );
        
        // If card is partially out of view, scroll to it
        if (!isPartiallyVisible || rect.top < 50) {
          this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
    
    // Add keyboard accessibility
    member.setAttribute('tabindex', '0');
    member.setAttribute('role', 'button');
    member.setAttribute('aria-expanded', 'false');
    
    member.addEventListener('keydown', function(event) {
      // Expand/collapse on Enter or Space key
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.click();
        this.setAttribute('aria-expanded', this.classList.contains('active').toString());
      }
    });
  });
  
  console.log('Team member expandable cards initialized');
}
