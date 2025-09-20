'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image, FileText, Camera, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChecklistPhoto, ChecklistDocument } from '@/types';

interface FileUploadProps {
  photos: ChecklistPhoto[];
  documents: ChecklistDocument[];
  onPhotosChange: (photos: ChecklistPhoto[]) => void;
  onDocumentsChange: (documents: ChecklistDocument[]) => void;
  questionId?: string;
  className?: string;
}

export function FileUpload({
  photos,
  documents,
  onPhotosChange,
  onDocumentsChange,
  questionId,
  className
}: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList) => {
    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        // Simular upload do arquivo
        const uploadedFile = await simulateFileUpload(file);

        if (file.type.startsWith('image/')) {
          // É uma foto
          const newPhoto: ChecklistPhoto = {
            id: `photo_${Date.now()}_${Math.random()}`,
            url: uploadedFile.url,
            filename: file.name,
            description: '',
            category: 'general',
            questionId,
            uploadedAt: new Date()
          };
          onPhotosChange([...photos, newPhoto]);
        } else {
          // É um documento
          const newDocument: ChecklistDocument = {
            id: `doc_${Date.now()}_${Math.random()}`,
            url: uploadedFile.url,
            filename: file.name,
            type: getDocumentType(file.type),
            description: '',
            questionId,
            uploadedAt: new Date()
          };
          onDocumentsChange([...documents, newDocument]);
        }
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
        alert(`Erro ao fazer upload do arquivo ${file.name}`);
      }
    }

    setUploading(false);
  };

  const simulateFileUpload = async (file: File): Promise<{ url: string }> => {
    // Simular delay de upload
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Criar URL temporária para preview
    const url = URL.createObjectURL(file);

    return { url };
  };

  const getDocumentType = (mimeType: string): 'pdf' | 'image' | 'other' => {
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.startsWith('image/')) return 'image';
    return 'other';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    e.target.value = '';
  };

  const removePhoto = (photoId: string) => {
    onPhotosChange(photos.filter(p => p.id !== photoId));
  };

  const removeDocument = (documentId: string) => {
    onDocumentsChange(documents.filter(d => d.id !== documentId));
  };

  const updatePhotoDescription = (photoId: string, description: string) => {
    onPhotosChange(photos.map(p =>
      p.id === photoId ? { ...p, description } : p
    ));
  };

  const updatePhotoCategory = (photoId: string, category: ChecklistPhoto['category']) => {
    onPhotosChange(photos.map(p =>
      p.id === photoId ? { ...p, category } : p
    ));
  };

  const updateDocumentDescription = (documentId: string, description: string) => {
    onDocumentsChange(documents.map(d =>
      d.id === documentId ? { ...d, description } : d
    ));
  };


  return (
    <div className={className}>
      {/* Área de upload */}
      <Card
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          dragOver
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">Fazendo upload...</p>
              </>
            ) : (
              <>
                <div className="flex space-x-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Clique para selecionar ou arraste arquivos aqui
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Fotos: JPG, PNG, WebP (até 10MB) • Documentos: PDF (até 20MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Lista de fotos */}
      {photos.length > 0 && (
        <div className="mt-6">
          <Label className="text-base font-medium">Fotos ({photos.length})</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={photo.url}
                    alt={photo.filename}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removePhoto(photo.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium truncate" title={photo.filename}>
                      {photo.filename}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(photo.uploadedAt).toLocaleString('pt-BR')}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Categoria</Label>
                    <Select
                      value={photo.category}
                      onValueChange={(value: ChecklistPhoto['category']) =>
                        updatePhotoCategory(photo.id, value)
                      }
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Geral</SelectItem>
                        <SelectItem value="exterior">Exterior</SelectItem>
                        <SelectItem value="interior">Interior</SelectItem>
                        <SelectItem value="damage">Avarias</SelectItem>
                        <SelectItem value="documents">Documentos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Descrição</Label>
                    <Textarea
                      placeholder="Descreva a foto..."
                      value={photo.description || ''}
                      onChange={(e) => updatePhotoDescription(photo.id, e.target.value)}
                      className="min-h-[60px] text-xs"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Lista de documentos */}
      {documents.length > 0 && (
        <div className="mt-6">
          <Label className="text-base font-medium">Documentos ({documents.length})</Label>
          <div className="space-y-3 mt-3">
            {documents.map((document) => (
              <Card key={document.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {document.type === 'pdf' ? (
                        <FileText className="w-8 h-8 text-red-500" />
                      ) : document.type === 'image' ? (
                        <Image className="w-8 h-8 text-blue-500" />
                      ) : (
                        <FileText className="w-8 h-8 text-gray-500" />
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{document.filename}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(document.uploadedAt).toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(document.url, '_blank')}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeDocument(document.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Descrição</Label>
                        <Input
                          placeholder="Descreva o documento..."
                          value={document.description || ''}
                          onChange={(e) => updateDocumentDescription(document.id, e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}