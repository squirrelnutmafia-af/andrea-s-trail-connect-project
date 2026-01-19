import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RouteDetails } from '@/components/details';
import { mockRoutes } from '@/data/mockRoutes';

// Mock data for route details
const mockCreator = {
  name: 'Alpine Guide Max',
  badge: 'Certified Guide',
  avatarUrl: '',
};

const mockPastEvents = [
  {
    id: '1',
    date: 'April 15, 2024',
    participantCount: 12,
    organizerName: 'John Doe',
    organizerAvatarUrl: '',
  },
  {
    id: '2',
    date: 'March 22, 2024',
    participantCount: 8,
    organizerName: 'Sarah Smith',
    organizerAvatarUrl: '',
  },
  {
    id: '3',
    date: 'February 10, 2024',
    participantCount: 15,
    organizerName: 'Mike Johnson',
    organizerAvatarUrl: '',
  },
];

const mockDiscussion = [
  {
    id: '1',
    author: 'Victor',
    authorAvatarUrl: '',
    content: 'Do you think winter hiking boots or lighter trail running shoes would be better for this trek? If there\'s no snow and it\'s not too cold, I\'m leaning towards the trail running shoes being best.',
    timeAgo: '1d ago',
  },
  {
    id: '2',
    author: 'Anna',
    authorAvatarUrl: '',
    content: 'I only carry some clothes and necessary stuff, in total less than 4 kilos. I\'m staying in houses.',
    timeAgo: '1d ago',
  },
];

const RouteDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const route = mockRoutes.find((r) => r.id === id);

  if (!route) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Route not found</h1>
          <p className="text-muted-foreground mb-6">The route you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/routes')}
            className="text-primary hover:text-primary/80"
          >
            Back to routes
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // Generate gallery images from the same route image for demo
  const galleryImages = [
    { src: route.imageUrl, alt: route.name },
    { src: route.imageUrl, alt: route.name },
    { src: route.imageUrl, alt: route.name },
    { src: route.imageUrl, alt: route.name },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <RouteDetails
          route={route}
          galleryImages={galleryImages}
          creator={mockCreator}
          pastEvents={mockPastEvents}
          discussion={mockDiscussion}
          totalComments={5}
          onBack={() => navigate('/routes')}
          onCreateEvent={() => console.log('Create event for route:', route.name)}
        />
      </main>
      <Footer />
    </div>
  );
};

export default RouteDetailsPage;
