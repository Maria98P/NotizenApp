<?php

namespace App\Controller;

use App\Entity\Notizen;
use App\Repository\NotizenRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class NotizenController extends AbstractController
{
    // Erhält alle Notizen (read)
    #[Route('/notizen', name: 'app_notizen', methods: ('GET'))]
    public function index(NotizenRepository $notizenRepository): JsonResponse
    {
        // Holt alle Notizen aus dem Repository
        $notizen = $notizenRepository->findAll();
        
        // Überprüft, ob Notizen gefunden wurden
        $response = count($notizen) == 0 ? "Keine Notizen gefunden" : $notizen;
        return $this->json([
            "nachricht" => "Alle Notizen",
            "data" => $response,
            "status" => JsonResponse::HTTP_OK
        ]);
    }

    // Sucht nach einer Notiz mit der gegebenen ID im Repository
    #[Route('/notizen/{id}', name: 'app_notizen_details', methods: ('GET'))]
    public function details(NotizenRepository $notizenRepository, $id): JsonResponse
    {
        // Findet die Notiz mit der angegebenen ID
        $notiz = $notizenRepository->find($id);
        
        // Wenn die Notiz gefunden wird, wird sie zurückgegeben
        if ($notiz) {
            return $this->json([
                "nachricht" => "Details",
                "data" => $notiz,
                "status" => JsonResponse::HTTP_OK
            ]);
        // Wenn die Notiz nicht gefunden wird, wird eine Fehlermeldung zurückgegeben
        } else {
            return $this->json([
                "nachricht" => "Notiz nicht gefunden",
                "data" => null,
                "status" => JsonResponse::HTTP_BAD_REQUEST
            ]);
        }
    }

    // Löscht eine Notiz mit der gegebenen ID
    #[Route('/notizen/{id}', name: 'app_notizen_delete', methods: ('DELETE'))]
    public function delete(NotizenRepository $notizenRepository, EntityManagerInterface $entityManager, $id): JsonResponse
    {
        // Findet die Notiz mit der angegebenen ID
        $notiz = $notizenRepository->find($id);
        
        // Wenn die Notiz gefunden wird, wird sie gelöscht
        if ($notiz) {
            $entityManager->remove($notiz);
            $entityManager->flush();
            return $this->json([
                "nachricht" => "Notiz gelöscht",
                "data" => null,
                "status" => JsonResponse::HTTP_OK
            ]);
        // Wenn die Notiz nicht gefunden wird, wird eine Fehlermeldung zurückgegeben
        } else {
            return $this->json([
                "nachricht" => "Notiz nicht gefunden",
                "data" => null,
                "status" => JsonResponse::HTTP_BAD_REQUEST
            ]);
        }
    }

    // Erstellt eine neue Notiz
    #[Route('/notizen/create', name: 'app_notizen_create', methods: ('POST'))]
    public function create(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        // Holt die Daten aus der Anfrage
        $titel = $request->request->get("titel");
        $inhalt = $request->request->get("inhalt");

        // Erstellt eine neue Notiz und setzt die Daten
        $notiz = new Notizen();
        $notiz->setTitel($titel);
        $notiz->setInhalt($inhalt);
        // Setzt das Erstellungsdatum auf das aktuelle Datum und Uhrzeit
        $notiz->setErstellungsdatum(new \DateTime());
        // Speichert die Notiz in der Datenbank
        $entityManager->persist($notiz);
        $entityManager->flush();

        return $this->json([
            "nachricht" => "Notiz wurde erstellt",
            "data" => null,
            "status" => JsonResponse::HTTP_CREATED
        ]);
    }

    // Bearbeitet eine bestehende Notiz mit der gegebenen ID
    #[Route('/notizen/edit/{id}', name: 'app_notizen_edit', methods: ('PUT'))]
    public function put(EntityManagerInterface $entityManager, Request $request, NotizenRepository $notizenRepository, $id): JsonResponse
    {
        // Find the note with the given ID
        $notiz = $notizenRepository->find($id);

        // If the note is found, update the data
        if ($notiz) {
            $titel = $request->request->get("titel");
            $inhalt = $request->request->get("inhalt");

            if ($titel !== null) {
                $notiz->setTitel($titel);
            }
            if ($inhalt !== null) {
                $notiz->setInhalt($inhalt);
            }

            // Save the changes to the database
            $entityManager->persist($notiz);
            $entityManager->flush();

            return $this->json([
                "nachricht" => "Notiz aktualisiert",
                "data" => $notiz,
                "status" => JsonResponse::HTTP_OK
            ]);
        } else {
            return $this->json([
                "nachricht" => "Notiz nicht gefunden",
                "data" => null,
                "status" => JsonResponse::HTTP_BAD_REQUEST
            ]);
        }
    }
}
