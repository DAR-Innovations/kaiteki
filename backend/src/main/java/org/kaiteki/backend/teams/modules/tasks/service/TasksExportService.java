package org.kaiteki.backend.teams.modules.tasks.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.kaiteki.backend.teams.modules.tasks.models.dto.ExportTasksDTO;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksDTO;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksFilterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import static java.util.Objects.nonNull;

@Service
public class TasksExportService {
    private static final String[] COLUMNS = {"#", "Task", "Executor", "Priority", "Status", "Completed"};
    private TasksService tasksService;

    @Autowired
    public void setTasksService(TasksService tasksService) {
        this.tasksService = tasksService;
    }

    public ResponseEntity<byte[]> exportTasks(ExportTasksDTO dto) throws IOException {
        TasksFilterDTO filter = TasksFilterDTO.builder()
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .executorId(dto.getExecutorId())
                .teamId(dto.getTeamId())
                .build();

        List<TasksDTO> tasks = tasksService.searchTasks(filter);

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Tasks in period from " + dto.getStartDate() + " to " + dto.getEndDate());

            // Create bold font style
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);

            // Create CellStyle with bold font
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            // Create header row and make it bold
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < COLUMNS.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(COLUMNS[i]);
                cell.setCellStyle(headerCellStyle);
            }

            // Populate data rows
            int rowNum = 1;
            for (TasksDTO task : tasks) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(task.getId());
                row.createCell(1).setCellValue(task.getTitle());

                String executorName = "Unassigned";
                if (nonNull(task.getExecutorMember())) {
                    executorName = task.getExecutorMember().getFullName();
                }

                row.createCell(2).setCellValue(executorName);
                row.createCell(3).setCellValue(task.getPriority().name());
                row.createCell(4).setCellValue(task.getStatus().getName());
                row.createCell(5).setCellValue(task.getCompleted() ? "Yes": "No");
            }

            // After populating data rows
            for (int col = 0; col < COLUMNS.length; col++) {
                sheet.autoSizeColumn(col);
            }

            // Write the workbook to a ByteArrayOutputStream
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            workbook.write(stream);

            // Set response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", "tasks.xlsx");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(stream.toByteArray());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to download the tasks");
        }
    }
}
