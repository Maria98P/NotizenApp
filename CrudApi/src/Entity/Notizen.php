<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\NotizenRepository;
use Doctrine\DBAL\Types\Types;

use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity(repositoryClass: NotizenRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            uriTemplate: '/notizen/{id}',
            normalizationContext: ['groups' => 'notizen:item']),
        new GetCollection(
            uriTemplate: '/notizen',
            normalizationContext: ['groups' => 'notizen:list']),
        new Post(
            uriTemplate: '/notizen/create',
            denormalizationContext: ['groups' => 'notizen:write']),
        new Put(
            uriTemplate: '/notizen/{id}/update',
            denormalizationContext: ['groups' => 'notizen:write']),
        new Delete(uriTemplate: '/notizen/{id}/delete'),
       
    ],
    
    order: ['titel' => 'DESC', 'inhalt' => 'ASC'],
    paginationEnabled: false,
)]
class Notizen
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['notizen:list', 'notizen:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['notizen:list', 'notizen:item', 'notizen:write'])]
    private ?string $titel = null;

    #[ORM\Column(length: 500)]
    #[Groups(['notizen:list', 'notizen:item', 'notizen:write'])]
    private ?string $inhalt = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['notizen:list', 'notizen:item', 'notizen:write'])]
    private ?\DateTimeInterface $erstellungsdatum = null;


    // Getter für ID
    public function getId(): ?int
    {
        return $this->id;
    }

    // Getter und Setter für Titel
    public function getTitel(): ?string
    {
        return $this->titel;
    }

    public function setTitel(string $titel): static
    {
        $this->titel = $titel;

        return $this;
    }


    // Getter und Setter für Inhalt

    public function getInhalt(): ?string
    {
        return $this->inhalt;
    }

    public function setInhalt(string $inhalt): static
    {
        $this->inhalt = $inhalt;

        return $this;
    }

    
    // Getter und Setter für ErstellungsDatum

    public function getErstellungsdatum(): ?\DateTimeInterface
    {
        return $this->erstellungsdatum;
    }

    public function setErstellungsdatum(?\DateTimeInterface $erstellungsdatum): static
    {
        $this->erstellungsdatum = $erstellungsdatum;

        return $this;
    }
}

