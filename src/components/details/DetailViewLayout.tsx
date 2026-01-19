import { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
}

interface PersonInfo {
  name: string;
  badge?: string;
  avatarUrl?: string;
}

interface DiscussionComment {
  id: string;
  author: string;
  authorAvatarUrl?: string;
  content: string;
  timeAgo: string;
}

interface DetailViewLayoutProps {
  // Header
  dateLabel?: string;
  timeLabel?: string;
  title: string;
  
  // Quick stats row
  quickStats: { label: string; value: string }[];
  
  // Primary action
  primaryActionLabel: string;
  onPrimaryAction?: () => void;
  
  // Gallery
  mainImage: string;
  galleryImages?: GalleryImage[];
  onAddPhotos?: () => void;
  
  // Description
  description: string;
  
  // Main content sections (flexible)
  mainContent?: ReactNode;
  
  // Route details stats
  routeStats?: { icon: ReactNode; label: string; value: string }[];
  
  // Sidebar
  personLabel: string;
  person: PersonInfo;
  onMessagePerson?: () => void;
  
  // Participants or Past Events section
  sidebarListSection?: ReactNode;
  
  // Discussion
  discussion: DiscussionComment[];
  totalComments?: number;
  onAddComment?: (text: string) => void;
  
  // Modal control
  open: boolean;
  onClose: () => void;
}

export const DetailViewLayout = ({
  dateLabel,
  timeLabel,
  title,
  quickStats,
  primaryActionLabel,
  onPrimaryAction,
  mainImage,
  galleryImages = [],
  onAddPhotos,
  description,
  mainContent,
  routeStats,
  personLabel,
  person,
  onMessagePerson,
  sidebarListSection,
  discussion,
  totalComments,
  onAddComment,
  open,
  onClose,
}: DetailViewLayoutProps) => {
  const displayedComments = discussion.slice(0, 2);
  const remainingComments = totalComments ? totalComments - displayedComments.length : 0;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-background/80 backdrop-blur-sm" />
        <DialogContent className="fixed inset-0 max-w-none w-full h-full rounded-none border-0 p-0 overflow-y-auto bg-background">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              {/* Main Content */}
              <div className="space-y-6">
                {/* Gallery + Header Row */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Gallery */}
                  <div className="flex-shrink-0 space-y-3">
                    {/* Main Image */}
                    <div className="w-full md:w-72 h-64 md:h-72 rounded-lg overflow-hidden">
                      <img
                        src={mainImage}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-4 gap-2">
                      {galleryImages.slice(0, 4).map((img, index) => (
                        <div 
                          key={index} 
                          className={cn(
                            "relative rounded-md overflow-hidden aspect-square",
                            index === 0 && "col-span-2 row-span-2"
                          )}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                          {index === 3 && galleryImages.length > 4 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-semibold">+{galleryImages.length - 4}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {onAddPhotos && (
                      <button
                        onClick={onAddPhotos}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Add route photos
                      </button>
                    )}
                  </div>

                  {/* Header Info */}
                  <div className="flex-1 space-y-4">
                    {(dateLabel || timeLabel) && (
                      <div className="text-sm text-foreground">
                        <p className="font-semibold">{dateLabel}</p>
                        {timeLabel && <p className="text-muted-foreground">{timeLabel}</p>}
                      </div>
                    )}

                    <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {title}
                    </h1>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                      {quickStats.map((stat, index) => (
                        <div key={index}>
                          <span className="text-muted-foreground">{stat.label}</span>
                          <p className="font-medium text-foreground">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <span className="sr-only">Share</span>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <span className="sr-only">Save</span>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </Button>
                      </div>
                      <Button onClick={onPrimaryAction} className="px-8">
                        {primaryActionLabel}
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <section>
                  <h2 className="text-lg font-semibold mb-3">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                  <button className="text-sm text-primary hover:text-primary/80 mt-2 transition-colors">
                    Show more
                  </button>
                </section>

                {/* Main Content (custom sections) */}
                {mainContent}

                {/* Route Stats */}
                {routeStats && routeStats.length > 0 && (
                  <section>
                    <h2 className="text-lg font-semibold mb-4">Route details</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {routeStats.map((stat, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center p-4 bg-card border border-border rounded-lg"
                        >
                          <div className="text-muted-foreground mb-1">{stat.icon}</div>
                          <span className="text-xs text-muted-foreground">{stat.label}</span>
                          <span className="font-semibold text-foreground">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Person Card */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="text-base font-semibold mb-4">{personLabel}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={person.avatarUrl} alt={person.name} />
                        <AvatarFallback>
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{person.name}</p>
                        {person.badge && (
                          <span className="text-xs text-muted-foreground">{person.badge}</span>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={onMessagePerson}>
                      Send a message
                    </Button>
                  </div>
                </div>

                {/* Participants or Past Events Section */}
                {sidebarListSection}

                {/* Discussion */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="text-base font-semibold mb-4">Discussion</h3>
                  <div className="space-y-4">
                    {displayedComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={comment.authorAvatarUrl} alt={comment.author} />
                          <AvatarFallback className="text-xs">
                            {comment.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-medium text-primary">{comment.author}</span>
                            {' '}
                            <span className="text-muted-foreground">{comment.content}</span>
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <button className="text-primary hover:text-primary/80">Like</button>
                            <span>·</span>
                            <button className="text-primary hover:text-primary/80">Reply</button>
                            <span>·</span>
                            <span>{comment.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {remainingComments > 0 && (
                    <button className="text-sm text-primary hover:text-primary/80 mt-4 transition-colors">
                      + {remainingComments} comments
                    </button>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};