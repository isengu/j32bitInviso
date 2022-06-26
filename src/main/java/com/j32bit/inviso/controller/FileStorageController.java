package com.j32bit.inviso.controller;

import com.j32bit.inviso.service.FileStorageService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping
public class FileStorageController {

    private final FileStorageService fileStorageService;

    /**
     * Upload the file and return it's generated name.
     *
     * @param multipartFile given file.
     * @return uniquely generated filename.
     */
    @PostMapping("/api/file/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile multipartFile) {
        return new ResponseEntity<>(fileStorageService.save(multipartFile), HttpStatus.OK);
    }

    /**
     * Load the file.
     *
     * @param filename file name.
     * @return requested file.
     */
    @GetMapping("/file/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = fileStorageService.load(filename);
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    /**
     * Tell the front-end where it can access files.
     *
     * @return files path.
     */
    @GetMapping("/api/file/getFileDownloadPath")
    public ResponseEntity<?> getFileDownloadPath() {
        Map<String, String> response = new HashMap<>();
        response.put("filePath", "/file");
        response.put("imagePath", "/file");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
