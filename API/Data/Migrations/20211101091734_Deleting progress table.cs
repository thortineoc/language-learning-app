using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API.Data.Migrations
{
    public partial class Deletingprogresstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TranslationUserProgresses_TranslationProgress_TranslationPr~",
                table: "TranslationUserProgresses");

            migrationBuilder.DropTable(
                name: "TranslationProgress");

            migrationBuilder.DropIndex(
                name: "IX_TranslationUserProgresses_TranslationProgressId",
                table: "TranslationUserProgresses");

            migrationBuilder.DropColumn(
                name: "TranslationProgressId",
                table: "TranslationUserProgresses");

            migrationBuilder.AddColumn<bool>(
                name: "IsLearned",
                table: "TranslationUserProgresses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsToReview",
                table: "TranslationUserProgresses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TimesRepeated",
                table: "TranslationUserProgresses",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLearned",
                table: "TranslationUserProgresses");

            migrationBuilder.DropColumn(
                name: "IsToReview",
                table: "TranslationUserProgresses");

            migrationBuilder.DropColumn(
                name: "TimesRepeated",
                table: "TranslationUserProgresses");

            migrationBuilder.AddColumn<int>(
                name: "TranslationProgressId",
                table: "TranslationUserProgresses",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TranslationProgress",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsLearned = table.Column<bool>(type: "boolean", nullable: false),
                    IsToReview = table.Column<bool>(type: "boolean", nullable: false),
                    TimesRepeated = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TranslationProgress", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TranslationUserProgresses_TranslationProgressId",
                table: "TranslationUserProgresses",
                column: "TranslationProgressId");

            migrationBuilder.AddForeignKey(
                name: "FK_TranslationUserProgresses_TranslationProgress_TranslationPr~",
                table: "TranslationUserProgresses",
                column: "TranslationProgressId",
                principalTable: "TranslationProgress",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
